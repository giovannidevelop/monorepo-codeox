package cl.codeox.payment.payment_core.adapter.out.persistence.jpa.payment;

import java.time.Instant;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import cl.codeox.payment.payment_core.adapter.out.persistence.entity.payment.PaymentEntity;
import cl.codeox.payment.payment_core.domain.payment.PaymentStatus;

public interface PaymentJpaRepository
    extends JpaRepository<PaymentEntity, Long>, JpaSpecificationExecutor<PaymentEntity> {

  Optional<PaymentEntity> findByCommerceOrder(String commerceOrder);
  Optional<PaymentEntity> findTopByCommerceOrderOrderByUpdatedAtDesc(String commerceOrder);
  Optional<PaymentEntity> findByToken(String token);
  Optional<PaymentEntity> findByFlowOrder(Long flowOrder);

  List<PaymentEntity> findByStatus(PaymentStatus status);
  List<PaymentEntity> findByStatusIn(Collection<PaymentStatus> statuses);
  List<PaymentEntity> findByEmail(String email);

  List<PaymentEntity> findByCreatedAtBetween(Instant fromInclusive, Instant toExclusive);
  List<PaymentEntity> findByStatusAndCreatedAtBetween(
      PaymentStatus status, Instant fromInclusive, Instant toExclusive);

  boolean existsByCommerceOrder(String commerceOrder);
  boolean existsByToken(String token);

  Page<PaymentEntity> findAllByOrderByCreatedAtDesc(Pageable pageable);
  Page<PaymentEntity> findByStatusOrderByCreatedAtDesc(PaymentStatus status, Pageable pageable);
}
