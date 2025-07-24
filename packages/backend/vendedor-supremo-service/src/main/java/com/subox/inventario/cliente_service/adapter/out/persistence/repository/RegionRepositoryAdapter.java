package com.subox.inventario.cliente_service.adapter.out.persistence.repository;

import com.subox.inventario.cliente_service.adapter.out.persistence.entity.ubicacion.RegionEntity;
import com.subox.inventario.cliente_service.adapter.out.persistence.jpa.RegionRepository;
import com.subox.inventario.cliente_service.port.out.ubicacion.RegionRepositoryPort;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class RegionRepositoryAdapter implements RegionRepositoryPort {

    private final RegionRepository regionRepository;

    @Override
    public List<com.subox.inventario.cliente_service.domain.model.ubicacion.Region> findAll() {
        return regionRepository.findAll().stream()
                .map(RegionEntity::toDomain)
                .collect(Collectors.toList());
    }

}
