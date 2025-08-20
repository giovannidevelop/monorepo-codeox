package cl.codeox.payment.payment_core.adapter.in.mapper.payment;

import java.math.BigDecimal;
import java.math.RoundingMode;

import org.springframework.stereotype.Component;

import cl.codeox.payment.payment_core.adapter.in.dto.payment.PaymentRequest;
import cl.codeox.payment.payment_core.adapter.in.dto.payment.PaymentResponse;
import cl.codeox.payment.payment_core.domain.payment.Payment;
import cl.codeox.payment.payment_core.domain.payment.PaymentStatus;
import lombok.NonNull;

@Component
public class PaymentMapper {

  /** Crea un modelo de dominio desde el request (para create). */
  public Payment toModel(@NonNull PaymentRequest request) {
    return Payment.builder()
        .commerceOrder(normalize(request.getCommerceOrder()))
        .subject(normalize(request.getSubject()))
        .currency(normalizeCurrency(request.getCurrency()))
        .amount(normalizeAmount(request.getAmount()))
        .email(normalizeEmail(request.getEmail()))
        .status(PaymentStatus.PENDING) // default al crear
        .rawProviderStatus(null)
        .requestDate(normalize(request.getRequestDate()))
        .build();
  }

  /** Igual que el anterior pero fijando el id (para update/put/patch). */
  public Payment toModel(@NonNull Long id, @NonNull PaymentRequest request) {
    Payment model = toModel(request);
    model.setId(id);
    return model;
  }

  /** Crea el DTO de respuesta desde el modelo de dominio. */
  public PaymentResponse toResponse(@NonNull Payment payment) {
    return PaymentResponse.builder()
        .id(payment.getId())
        .commerceOrder(payment.getCommerceOrder())
        .flowOrder(payment.getFlowOrder())
        .token(payment.getToken())
        .subject(payment.getSubject())
        .currency(payment.getCurrency())
        .amount(payment.getAmount())
        .email(payment.getEmail())
        .status(payment.getStatus())
        .rawProviderStatus(payment.getRawProviderStatus())
        .requestDate(payment.getRequestDate())
        .createdAt(payment.getCreatedAt())
        .updatedAt(payment.getUpdatedAt())
        .build();
  }

  // ------------------------
  // Helpers de normalización
  // ------------------------

  private String normalize(String s) {
    return (s == null) ? null : s.trim();
  }

  private String normalizeCurrency(String c) {
    String v = normalize(c);
    return (v == null || v.isBlank()) ? "CLP" : v.toUpperCase();
  }

  private BigDecimal normalizeAmount(BigDecimal a) {
    return (a == null) ? null : a.setScale(2, RoundingMode.HALF_UP);
  }

  private String normalizeEmail(String email) {
    String v = normalize(email);
    return (v == null) ? null : v.toLowerCase();
  }
}