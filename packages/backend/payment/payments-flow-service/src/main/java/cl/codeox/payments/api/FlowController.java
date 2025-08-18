package cl.codeox.payments.api;

import cl.codeox.payments.flow.FlowClient;
import cl.codeox.payments.service.PaymentService;
import cl.codeox.payments.domain.PaymentEntity;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.Instant;

@RestController
@RequestMapping("/api/payments/flow")
@Validated
public class FlowController {
  private final FlowClient flow;
  private final PaymentService payments;

  public FlowController(FlowClient flow, PaymentService payments) {
    this.flow = flow; this.payments = payments;
  }

  public record CreateReq(
      @NotBlank String subject,
      @NotNull BigDecimal amount,
      @Email String email,
      String commerceOrder,
      Integer paymentMethod
  ) {}
  public record CreateResp(String paymentUrl, String token, Long flowOrder, String commerceOrder){}
  public record StatusResp(String commerceOrder, String status, Long flowOrder){}

  @PostMapping("/create-order")
  public CreateResp create(@RequestBody CreateReq req){
    String order = (req.commerceOrder()!=null && !req.commerceOrder().isBlank())
        ? req.commerceOrder()
        : "ORD-" + Instant.now().toEpochMilli();
    var r = flow.createOrder(order, req.subject(), req.amount(), req.email(), req.paymentMethod());
    // Registrar como pendiente
    payments.registerCreate(order, r.flowOrder, r.token, req.subject(), "CLP", req.amount(), req.email());
    return new CreateResp(r.url + "?token=" + r.token, r.token, r.flowOrder, order);
  }

  // Webhook (urlConfirmation): POST x-www-form-urlencoded con "token"
  @PostMapping(value = "/webhook", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
  public String webhook(@RequestParam("token") String token){
    var status = flow.getStatusByToken(token);
    PaymentEntity saved = payments.upsertFromFlowStatus(status, token);
    return "OK";
  }

  // Retorno (urlReturn): POST x-www-form-urlencoded con "token"
  @PostMapping(value = "/return", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
  public String returnPage(@RequestParam("token") String token){
    var status = flow.getStatusByToken(token);
    PaymentEntity saved = payments.upsertFromFlowStatus(status, token);
    return "Pago " + saved.getStatus() + " | Orden: " + saved.getCommerceOrder() + " | FlowOrder: " + saved.getFlowOrder();
  }

  @GetMapping("/status/{commerceOrder}")
  public StatusResp status(@PathVariable String commerceOrder){
    var p = payments.findByCommerceOrder(commerceOrder)
        .orElseThrow(() -> new RuntimeException("Orden no encontrada"));
    return new StatusResp(p.getCommerceOrder(), p.getStatus().name(), p.getFlowOrder());
  }
}
