package com.subox.inventario.cliente_service.adapter.out.persistence.jpa;


import org.springframework.data.jpa.repository.JpaRepository;

import com.subox.inventario.cliente_service.adapter.out.persistence.entity.ubicacion.UbicacionEntity;

import java.util.List;

public interface UbicacionRepository extends JpaRepository<UbicacionEntity, Long> {
    List<UbicacionEntity> findByComunaId(Long comunaId);
    List<UbicacionEntity> findByCalleAndNumero(String calle, String numero);
    boolean existsByDireccionCompleta(String direccionCompleta);
}
