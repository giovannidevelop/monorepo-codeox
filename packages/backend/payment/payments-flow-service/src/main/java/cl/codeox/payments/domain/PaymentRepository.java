package cl.codeox.payments.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PaymentRepository extends JpaRepository<PaymentEntity, Long> {
  Optional<PaymentEntity> findTopByCommerceOrderOrderByUpdatedAtDesc(String commerceOrder);
  Optional<PaymentEntity> findByToken(String token);
}
