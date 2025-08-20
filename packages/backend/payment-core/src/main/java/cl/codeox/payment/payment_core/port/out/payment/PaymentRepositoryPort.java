package cl.codeox.payment.payment_core.port.out.payment;

import java.time.Instant;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import cl.codeox.payment.payment_core.domain.payment.Payment;
import cl.codeox.payment.payment_core.domain.payment.PaymentStatus;

/**
 * Puerto de persistencia para Payment (hexagonal/clean).
 * Mantenerlo libre de tipos de Spring/JPA.
 */
public interface PaymentRepositoryPort {
  List<Payment> search(PaymentSearchCriteria criteria, int offset, int limit);
 
  // -------- CRUD básicos --------
  Payment save(Payment payment);
  List<Payment> saveAll(Collection<Payment> payments);

  Optional<Payment> findById(Long id);
  List<Payment> findAll();

  boolean existsById(Long id);
  long count();

  void deleteById(Long id);
  void delete(Payment payment);
  void deleteAllById(Collection<Long> ids);
  void deleteAll();

  // -------- Búsquedas por claves de negocio / únicas --------
  /** Única por constraint uk_payment_commerce */
  Optional<Payment> findByCommerceOrder(String commerceOrder);

  /** Única por constraint uk_payment_token */
  Optional<Payment> findByToken(String token);

  /** Asumido único por proveedor; si no lo fuera, cambia a List<> */
  Optional<Payment> findByFlowOrder(Long flowOrder);

  // -------- Filtros frecuentes --------
  List<Payment> findByStatus(PaymentStatus status);
  List<Payment> findByStatusIn(Collection<PaymentStatus> statuses);

  List<Payment> findByEmail(String email);

  List<Payment> findByCreatedAtBetween(Instant fromInclusive, Instant toExclusive);
  List<Payment> findByStatusAndCreatedAtBetween(
      PaymentStatus status, Instant fromInclusive, Instant toExclusive);

  // -------- Existencia por claves de negocio --------
  boolean existsByCommerceOrder(String commerceOrder);
  boolean existsByToken(String token);

  // -------- Listados paginados simples (agnósticos) --------
  List<Payment> findAllOrderByCreatedAtDesc(int offset, int limit);
  List<Payment> findByStatusOrderByCreatedAtDesc(PaymentStatus status, int offset, int limit);
}
