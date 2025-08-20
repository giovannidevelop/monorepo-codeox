package cl.codeox.payment.payment_core.adapter.in.dto.payment;


import java.math.BigDecimal;
import java.time.Instant;

import cl.codeox.payment.payment_core.domain.payment.PaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder @ToString @Data

public class PaymentResponse {
  private Long id;

  private String commerceOrder;
  private Long flowOrder;
  private String token;

  private String subject;
  private String currency;
  private BigDecimal amount;
  private String email;

  private PaymentStatus status;
  private String rawProviderStatus;
  private String requestDate;

  private Instant createdAt;
  private Instant updatedAt;
}
