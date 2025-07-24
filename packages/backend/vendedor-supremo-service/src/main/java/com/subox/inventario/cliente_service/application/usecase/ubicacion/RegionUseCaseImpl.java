package com.subox.inventario.cliente_service.application.usecase.ubicacion;

import java.util.List;

import org.springframework.stereotype.Service;

import com.subox.inventario.cliente_service.domain.model.ubicacion.Region;
import com.subox.inventario.cliente_service.port.in.ubicacion.RegionUseCase;
import com.subox.inventario.cliente_service.port.out.ubicacion.RegionRepositoryPort;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RegionUseCaseImpl implements RegionUseCase {

    private final RegionRepositoryPort repository;

    @Override
    public List<Region> findAll() {
        return repository.findAll();
    }
}
