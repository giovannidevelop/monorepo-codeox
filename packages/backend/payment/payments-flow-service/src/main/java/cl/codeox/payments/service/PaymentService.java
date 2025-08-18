package cl.codeox.payments.service;

import cl.codeox.payments.domain.*;
import cl.codeox.payments.flow.FlowClient;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Optional;

@Service
public class PaymentService {
  private final PaymentRepository repo;

  public PaymentService(PaymentRepository repo) {
    this.repo = repo;
  }

  @Transactional
  public PaymentEntity registerCreate(String commerceOrder, Long flowOrder, String token, String subject,
                                      String currency, BigDecimal amount, String email) {
    PaymentEntity p = repo.findTopByCommerceOrderOrderByUpdatedAtDesc(commerceOrder).orElse(new PaymentEntity());
    p.setCommerceOrder(commerceOrder);
    p.setFlowOrder(flowOrder);
    p.setToken(token);
    p.setSubject(subject);
    p.setCurrency(currency);
    p.setAmount(amount);
    p.setEmail(email);
    p.setStatus(PaymentStatus.PENDING);
    return repo.save(p);
  }

  @Transactional
  public PaymentEntity upsertFromFlowStatus(FlowClient.StatusResp s, String token) {
    PaymentEntity p = repo.findByToken(token).orElse(new PaymentEntity());
    p.setToken(token);
    p.setCommerceOrder(s.commerceOrder);
    p.setFlowOrder(s.flowOrder);
    p.setSubject(s.subject);
    p.setCurrency(s.currency);
    if (s.amount != null) p.setAmount(new java.math.BigDecimal(String.valueOf(s.amount)));
    p.setRequestDate(s.requestDate);
    p.setRawProviderStatus(String.valueOf(s.status));

    PaymentStatus mapped = switch (s.status != null ? s.status : -1) {
      case 1 -> PaymentStatus.PENDING;
      case 2 -> PaymentStatus.PAID;
      case 3 -> PaymentStatus.REJECTED;
      case 4 -> PaymentStatus.CANCELED;
      default -> PaymentStatus.UNKNOWN;
    };
    p.setStatus(mapped);
    return repo.save(p);
  }

  public Optional<PaymentEntity> findByCommerceOrder(String commerceOrder) {
    return repo.findTopByCommerceOrderOrderByUpdatedAtDesc(commerceOrder);
  }
}
