package cl.codeox.payment.payment_core.adapter.in.dto.payment;


import java.math.BigDecimal;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder @ToString
public class PaymentRequest {

  @NotBlank @Size(max = 64)
  private String commerceOrder;

  @Size(max = 255)
  private String subject;

  @Size(max = 8)
  private String currency;

  @NotNull @Positive
  private BigDecimal amount;

  @Email @Size(max = 255)
  private String email;

  @Size(max = 64)
  private String requestDate;
}
