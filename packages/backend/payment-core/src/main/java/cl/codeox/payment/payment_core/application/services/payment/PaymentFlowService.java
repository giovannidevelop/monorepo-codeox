package cl.codeox.payment.payment_core.application.services.payment;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cl.codeox.payment.payment_core.application.services.payment.flow.FlowClient;
import cl.codeox.payment.payment_core.domain.payment.Payment;
import cl.codeox.payment.payment_core.domain.payment.PaymentStatus;
import cl.codeox.payment.payment_core.port.out.payment.PaymentRepositoryPort;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class PaymentFlowService {

    private final FlowClient flowClient;
    private final PaymentRepositoryPort repo;

    /**
     * Crea un pago en Flow, persiste/actualiza el Payment y retorna datos para
     * redirigir.
     */
    public CreateOrderResult startPayment(String commerceOrder,
            String subject,
            BigDecimal amount,
            String email,
            Integer paymentMethod) {

        if (isBlank(commerceOrder)) {
            throw new IllegalArgumentException("commerceOrder requerido");
        }
        if (amount == null || amount.signum() <= 0) {
            throw new IllegalArgumentException("amount inválido");
        }

        // Normalización
        subject = norm(subject);
        email = normEmail(email);
        BigDecimal amt = amount.setScale(2, RoundingMode.HALF_UP);

        // 1) Llamada a Flow
        FlowClient.CreateOrderResp resp = flowClient.createOrder(
                commerceOrder, subject, amt, email, paymentMethod
        );

        if (resp == null || isBlank(resp.token) || isBlank(resp.url)) {
            throw new IllegalStateException("Respuesta inválida de Flow al crear orden");
        }

        // 2) Crear/actualizar Payment localmente
        Payment p = repo.findByCommerceOrder(commerceOrder).orElseGet(Payment::new);
        p.setCommerceOrder(commerceOrder);
        p.setSubject(subject);
        p.setCurrency("CLP");
        p.setAmount(amt);
        p.setEmail(email);
        p.setToken(resp.token);
        p.setFlowOrder(resp.flowOrder);
        p.setStatus(PaymentStatus.PENDING);
        p.setRawProviderStatus(null);

        p = repo.save(p);

        // 3) Retorno para redirigir al cliente
        return new CreateOrderResult(p.getId(), resp.url, resp.token, resp.flowOrder);
    }

    /**
     * Refresca el estado de un pago consultando Flow por token.
     */
    public Payment refreshStatusByToken(String token) {
        if (isBlank(token)) {
            throw new IllegalArgumentException("token requerido");
        }

        Payment p = repo.findByToken(token)
                .orElseThrow(() -> new IllegalArgumentException("Payment no encontrado para token"));

        FlowClient.StatusResp s = flowClient.getStatusByToken(token);
        if (s == null) {
            throw new IllegalStateException("Respuesta nula desde Flow");
        }

        // mapear estado
        PaymentStatus newStatus = mapFlowStatus(s.status);
        p.setStatus(newStatus);
        p.setRawProviderStatus(s.status == null ? null : s.status.toString());

        // sincronizar algunos campos si Flow devolvió valores
        if (s.flowOrder != null) {
            p.setFlowOrder(s.flowOrder);
        }
        if (!isBlank(s.requestDate)) {
            p.setRequestDate(s.requestDate);
        }
        if (!isBlank(s.subject)) {
            p.setSubject(s.subject);
        }
        if (!isBlank(s.currency)) {
            p.setCurrency(s.currency);
        }
        if (s.amount != null) {
            p.setAmount(BigDecimal.valueOf(s.amount).setScale(2, RoundingMode.HALF_UP));
        }
        if (!isBlank(s.commerceOrder)) {
            p.setCommerceOrder(s.commerceOrder);
        }

        return repo.save(p);
    }

    /**
     * Handler lógico para el webhook de Flow. Flow envía el token; con eso
     * consultamos estado. Devuelve el Payment actualizado.
     */
    public Payment handleWebhook(Map<String, String> formUrlEncodedBody) {
        // Nota: si deseas validar firma "s" del webhook, agrega esa verificación aquí.
        String token = formUrlEncodedBody == null ? null : formUrlEncodedBody.get("token");
        if (isBlank(token)) {
            throw new IllegalArgumentException("token faltante en webhook");
        }
        return refreshStatusByToken(token);
    }

    // ---------------- helpers ----------------
    private PaymentStatus mapFlowStatus(Integer status) {
        if (status == null) {
            return PaymentStatus.UNKNOWN;
        }
        return switch (status) {
            case 1 ->
                PaymentStatus.PENDING;
            case 2 ->
                PaymentStatus.PAID;
            case 3 ->
                PaymentStatus.REJECTED;
            case 4 ->
                PaymentStatus.CANCELED;
            default ->
                PaymentStatus.UNKNOWN;
        };
    }

    private String norm(String s) {
        return s == null ? null : s.trim();
    }

    private String normEmail(String s) {
        s = norm(s);
        return s == null ? null : s.toLowerCase();
    }

    private boolean isBlank(String s) {
        return s == null || s.trim().isEmpty();
    }

    // DTO de retorno para el "create"
    public record CreateOrderResult(Long paymentId, String redirectUrl, String token, Long flowOrder) {

    }
}
