package cl.codeox.payment.payment_core.adapter.out.persistence.jpa;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import cl.codeox.payment.payment_core.adapter.out.persistence.entity.ClienteEntity;



@Repository
public interface ClienteJpaRepository extends JpaRepository<ClienteEntity, Long> {
}