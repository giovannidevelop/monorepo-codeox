package com.subox.inventario.cliente_service.adapter.out.persistence.jpa;


import org.springframework.data.jpa.repository.JpaRepository;

import com.subox.inventario.cliente_service.adapter.out.persistence.entity.ubicacion.RegionEntity;


public interface RegionRepository extends JpaRepository<RegionEntity, Long> {
}
