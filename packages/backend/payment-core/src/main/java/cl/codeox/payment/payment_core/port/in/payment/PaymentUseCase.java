package cl.codeox.payment.payment_core.port.in.payment;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import cl.codeox.payment.payment_core.domain.payment.Payment;
import cl.codeox.payment.payment_core.domain.payment.PaymentStatus;


public interface PaymentUseCase {

  // ---- Lecturas / listados ----
  List<Payment> listAll();
  List<Payment> listByStatus(PaymentStatus status);
  List<Payment> listPage(int offset, int limit);
  List<Payment> listByStatusPage(PaymentStatus status, int offset, int limit);
  List<Payment> listCreatedBetween(Instant fromInclusive, Instant toExclusive);

  // ---- Búsquedas puntuales ----
  Payment get(Long id);
  Optional<Payment> findByCommerceOrder(String commerceOrder);
  Optional<Payment> findByToken(String token);
  Optional<Payment> findByFlowOrder(Long flowOrder);

  // ---- Mutaciones ----
  Payment create(Payment payment);
  Payment update(Long id, Payment payment); // actualiza campos editables
  Payment updateStatus(Long id, PaymentStatus newStatus, String rawProviderStatus);
  void delete(Long id);

  // ---- Misceláneos ----
  boolean existsByCommerceOrder(String commerceOrder);
  boolean existsByToken(String token);
  long count();
}