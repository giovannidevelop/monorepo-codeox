package cl.codeox.payment.payment_core.adapter.in.web.payment;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.net.URI;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.Instant;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import cl.codeox.payment.payment_core.application.services.payment.flow.FlowClient;
import cl.codeox.payment.payment_core.domain.payment.Payment;
import cl.codeox.payment.payment_core.domain.payment.PaymentStatus;
import cl.codeox.payment.payment_core.port.out.payment.PaymentRepositoryPort;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@RestController
@RequestMapping("/api/payments/flow")
@Validated
@CrossOrigin(origins = "http://localhost:3000") // DEV: habilita CORS para el front
public class PaymentFlowController {

  private final FlowClient flow;
  private final PaymentRepositoryPort repo;

  // Base del front para redirigir desde /return (en prod: https://codeox.cl)

@Value("${app.frontend.base-url:http://localhost:3000}")
private String frontBaseUrl;

  public PaymentFlowController(FlowClient flow, PaymentRepositoryPort repo) {
    this.flow = flow;
    this.repo = repo;
  }

  // ---- DTOs ----
  public record CreateReq(
      @NotBlank String subject,
      @NotNull BigDecimal amount,
      @Email String email,
      String commerceOrder,
      Integer paymentMethod
  ) {}
  public record CreateResp(String paymentUrl, String token, Long flowOrder, String commerceOrder) {}
  public record StatusResp(String commerceOrder, String status, Long flowOrder) {}

  // ---- Crear orden en Flow + upsert en BD ----
  @PostMapping(value = "/create-order", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
  public CreateResp create(@RequestBody @Validated CreateReq req) {
    String order = (req.commerceOrder() != null && !req.commerceOrder().isBlank())
        ? req.commerceOrder()
        : "ORD-" + Instant.now().toEpochMilli();

    Integer pm = (req.paymentMethod() != null) ? req.paymentMethod() : 9; // default

    var resp = flow.createOrder(order, req.subject(), req.amount(), req.email(), pm);
    if (resp == null || resp.token == null || resp.url == null) {
      throw new IllegalStateException("Respuesta inválida de Flow al crear orden");
    }

    Payment p = repo.findByCommerceOrder(order)
        .orElseGet(() -> Payment.builder()
            .commerceOrder(order)
            .status(PaymentStatus.PENDING)
            .build());

    p.setSubject(req.subject());
    p.setCurrency("CLP");
    p.setAmount(req.amount().setScale(2, RoundingMode.HALF_UP));
    p.setEmail(req.email() == null ? null : req.email().trim().toLowerCase());
    p.setToken(resp.token);
    p.setFlowOrder(resp.flowOrder);
    p.setRawProviderStatus(null);
    repo.save(p);

    String paymentUrl = resp.url + (resp.url.contains("?") ? "&" : "?") + "token=" + resp.token;
    return new CreateResp(paymentUrl, resp.token, resp.flowOrder, order);
  }

  // ---- Webhook de Flow (urlConfirmation) ----
@PostMapping(value = "/confirmation", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
public String confirmation(@RequestParam("token") String token) {
  var s = flow.getStatusByToken(token);
  if (s == null) throw new IllegalStateException("Status nulo desde Flow");

  Payment p = repo.findByToken(token).orElseGet(() ->
      Payment.builder()
          .commerceOrder(s.commerceOrder)
          .token(token)
          .flowOrder(s.flowOrder)
          .currency(s.currency)
          .subject(s.subject)
          .amount(s.amount == null ? null : BigDecimal.valueOf(s.amount).setScale(2, RoundingMode.HALF_UP))
          .status(PaymentStatus.PENDING)
          .build()
  );

  p.setStatus(mapFlowStatus(s.status));
  p.setRawProviderStatus(s.status == null ? null : s.status.toString());
  if (s.requestDate != null && !s.requestDate.isBlank()) p.setRequestDate(s.requestDate);
  if (s.flowOrder != null) p.setFlowOrder(s.flowOrder);
  if (s.commerceOrder != null && !s.commerceOrder.isBlank()) p.setCommerceOrder(s.commerceOrder);
  if (s.currency != null && !s.currency.isBlank()) p.setCurrency(s.currency);
  if (s.subject != null && !s.subject.isBlank()) p.setSubject(s.subject);
  if (s.amount != null) p.setAmount(BigDecimal.valueOf(s.amount).setScale(2, RoundingMode.HALF_UP));

  repo.save(p);
  return "OK";
}

@PostMapping(value = "/return", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
public ResponseEntity<Void> returnPage(@RequestParam String token) {
  confirmation(token); // o confirmation(token); si prefieres reutilizar
  var p = repo.findByToken(token).orElse(null);
  var order = p != null ? p.getCommerceOrder() : null;
  var thanks = frontBaseUrl + "/gracias?token=" + URLEncoder.encode(token, StandardCharsets.UTF_8)
      + (order != null ? "&order=" + URLEncoder.encode(order, StandardCharsets.UTF_8) : "");
  return ResponseEntity.status(302).location(URI.create(thanks)).build();
}


  // ---- Consultar estado local por commerceOrder ----
  @GetMapping("/status/{commerceOrder}")
  public StatusResp status(@PathVariable String commerceOrder) {
    var p = repo.findByCommerceOrder(commerceOrder)
        .orElseThrow(() -> new RuntimeException("Orden no encontrada"));
    return new StatusResp(p.getCommerceOrder(), p.getStatus().name(), p.getFlowOrder());
  }

  // ---- NUEVO: Consultar estado local por token (útil para /gracias) ----
  @GetMapping("/status-by-token")
  public StatusResp statusByToken(@RequestParam("token") String token) {
    var p = repo.findByToken(token)
        .orElseThrow(() -> new RuntimeException("Token no encontrado"));
    return new StatusResp(p.getCommerceOrder(), p.getStatus().name(), p.getFlowOrder());
  }

  private PaymentStatus mapFlowStatus(Integer s) {
    if (s == null) return PaymentStatus.UNKNOWN;
    return switch (s) {
      case 1 -> PaymentStatus.PENDING;
      case 2 -> PaymentStatus.PAID;
      case 3 -> PaymentStatus.REJECTED;
      case 4 -> PaymentStatus.CANCELED;
      default -> PaymentStatus.UNKNOWN;
    };
  }
}
