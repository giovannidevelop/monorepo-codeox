package cl.codeox.payment.payment_core.adapter.out.persistence.entity.payment;

import java.math.BigDecimal;
import java.time.Instant;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import cl.codeox.payment.payment_core.domain.payment.PaymentStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Table(name = "payments",
  uniqueConstraints = {
    @UniqueConstraint(name="uk_payment_commerce", columnNames={"commerceOrder"}),
    @UniqueConstraint(name="uk_payment_token", columnNames={"token"})
  },
  indexes = {
    @Index(name="idx_payment_status", columnList="status"),
    @Index(name="idx_payment_created_at", columnList="createdAt")
  }
)
public class PaymentEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @EqualsAndHashCode.Include
  private Long id;

  @Column(nullable = false, length = 64)
  private String commerceOrder;

  private Long flowOrder;

  @Column(nullable = false, length = 128)
  private String token;

  @Column(length = 255)
  private String subject;

  @Column(length = 8)
  private String currency;

  @Column(precision = 19, scale = 2)
  private BigDecimal amount;

  @Column(length = 255)
  private String email;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false, length = 16)
  @Builder.Default
  private PaymentStatus status = PaymentStatus.PENDING;

  @Column(length = 64)
  private String rawProviderStatus; // status numérico o texto por si acaso

  @Column(length = 64)
  private String requestDate;

  @CreationTimestamp
  @Column(updatable = false)
  private Instant createdAt;

  @UpdateTimestamp
  private Instant updatedAt;
}
