package cl.codeox.payment.payment_core.adapter.out.persistence.jpa;


import org.springframework.data.jpa.repository.JpaRepository;

import cl.codeox.payment.payment_core.adapter.out.persistence.entity.ubicacion.ComunaEntity;

import java.util.List;

public interface ComunaRepository extends JpaRepository<ComunaEntity, Long> {
    List<ComunaEntity> findByProvinciaId(Long provinciaId);
}
