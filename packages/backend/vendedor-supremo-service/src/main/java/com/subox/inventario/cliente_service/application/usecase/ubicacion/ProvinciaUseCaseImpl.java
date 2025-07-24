package com.subox.inventario.cliente_service.application.usecase.ubicacion;


import java.util.List;

import org.springframework.stereotype.Service;

import com.subox.inventario.cliente_service.domain.model.ubicacion.Provincia;
import com.subox.inventario.cliente_service.port.in.ubicacion.ProvinciaUseCase;
import com.subox.inventario.cliente_service.port.out.ubicacion.ProvinciaRepositoryPort;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProvinciaUseCaseImpl implements ProvinciaUseCase {

     private final ProvinciaRepositoryPort repository;
  
    @Override
    public List<Provincia> findByRegionId(Long regionId) {
       return repository.findByRegionId(regionId);
    }
}
