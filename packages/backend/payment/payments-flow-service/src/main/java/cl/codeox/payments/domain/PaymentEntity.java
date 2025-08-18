package cl.codeox.payments.domain;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.Instant;

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
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String commerceOrder;
  private Long flowOrder;
  private String token;

  private String subject;
  private String currency;
  private BigDecimal amount;
  private String email;

  @Enumerated(EnumType.STRING)
  private PaymentStatus status = PaymentStatus.PENDING;

  private String rawProviderStatus; // status numérico o texto por si acaso
  private String requestDate;

  @CreationTimestamp
  private Instant createdAt;
  @UpdateTimestamp
  private Instant updatedAt;

  // getters/setters
  public Long getId() { return id; }
  public void setId(Long id) { this.id = id; }
  public String getCommerceOrder() { return commerceOrder; }
  public void setCommerceOrder(String commerceOrder) { this.commerceOrder = commerceOrder; }
  public Long getFlowOrder() { return flowOrder; }
  public void setFlowOrder(Long flowOrder) { this.flowOrder = flowOrder; }
  public String getToken() { return token; }
  public void setToken(String token) { this.token = token; }
  public String getSubject() { return subject; }
  public void setSubject(String subject) { this.subject = subject; }
  public String getCurrency() { return currency; }
  public void setCurrency(String currency) { this.currency = currency; }
  public BigDecimal getAmount() { return amount; }
  public void setAmount(BigDecimal amount) { this.amount = amount; }
  public String getEmail() { return email; }
  public void setEmail(String email) { this.email = email; }
  public PaymentStatus getStatus() { return status; }
  public void setStatus(PaymentStatus status) { this.status = status; }
  public String getRawProviderStatus() { return rawProviderStatus; }
  public void setRawProviderStatus(String rawProviderStatus) { this.rawProviderStatus = rawProviderStatus; }
  public String getRequestDate() { return requestDate; }
  public void setRequestDate(String requestDate) { this.requestDate = requestDate; }
  public Instant getCreatedAt() { return createdAt; }
  public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
  public Instant getUpdatedAt() { return updatedAt; }
  public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }
}
