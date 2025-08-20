package cl.codeox.payment.payment_core.domain.payment;

import java.math.BigDecimal;
import java.time.Instant;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor()
@AllArgsConstructor
@Builder
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Payment {

  @EqualsAndHashCode.Include
  private Long id;

  private String commerceOrder;
  private Long flowOrder;
  private String token;

  private String subject;
  private String currency;
  private BigDecimal amount;
  private String email;

  @Builder.Default
  private PaymentStatus status = PaymentStatus.PENDING;

  private String rawProviderStatus; // status numérico o texto por si acaso
  private String requestDate;

  private Instant createdAt;
  private Instant updatedAt;
}
