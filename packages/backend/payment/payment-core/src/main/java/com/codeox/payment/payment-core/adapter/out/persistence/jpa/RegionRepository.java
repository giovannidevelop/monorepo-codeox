package cl.codeox.payment.payment_core.adapter.out.persistence.jpa;


import org.springframework.data.jpa.repository.JpaRepository;

import cl.codeox.payment.payment_core.adapter.out.persistence.entity.ubicacion.RegionEntity;


public interface RegionRepository extends JpaRepository<RegionEntity, Long> {
}
