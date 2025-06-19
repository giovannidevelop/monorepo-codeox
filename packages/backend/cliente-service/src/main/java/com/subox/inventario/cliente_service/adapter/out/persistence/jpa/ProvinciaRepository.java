package com.subox.inventario.cliente_service.adapter.out.persistence.jpa;


import org.springframework.data.jpa.repository.JpaRepository;

import com.subox.inventario.cliente_service.adapter.out.persistence.entity.ubicacion.ProvinciaEntity;

import java.util.List;

public interface ProvinciaRepository extends JpaRepository<ProvinciaEntity, Long> {
    List<ProvinciaEntity> findByRegionId(Long regionId);
}
