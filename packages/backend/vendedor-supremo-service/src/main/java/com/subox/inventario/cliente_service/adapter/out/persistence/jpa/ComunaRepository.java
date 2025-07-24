package com.subox.inventario.cliente_service.adapter.out.persistence.jpa;


import org.springframework.data.jpa.repository.JpaRepository;

import com.subox.inventario.cliente_service.adapter.out.persistence.entity.ubicacion.ComunaEntity;

import java.util.List;

public interface ComunaRepository extends JpaRepository<ComunaEntity, Long> {
    List<ComunaEntity> findByProvinciaId(Long provinciaId);
}
