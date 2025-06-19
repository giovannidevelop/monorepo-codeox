package com.subox.inventario.cliente_service.adapter.out.persistence.repository;

import com.subox.inventario.cliente_service.adapter.out.persistence.entity.ubicacion.ProvinciaEntity;
import com.subox.inventario.cliente_service.adapter.out.persistence.jpa.ProvinciaRepository;
import com.subox.inventario.cliente_service.domain.model.ubicacion.Provincia;
import com.subox.inventario.cliente_service.port.out.ubicacion.ProvinciaRepositoryPort;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;


import java.util.List;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class ProvinciaRepositoryAdapter implements ProvinciaRepositoryPort {

    private final ProvinciaRepository provinciaRepository;

    @Override
    public List<Provincia> findByRegionId(Long regionId) {
        return provinciaRepository.findByRegionId(regionId).stream()
                .map(ProvinciaEntity::toDomain)
                .collect(Collectors.toList());
    }

  
}
