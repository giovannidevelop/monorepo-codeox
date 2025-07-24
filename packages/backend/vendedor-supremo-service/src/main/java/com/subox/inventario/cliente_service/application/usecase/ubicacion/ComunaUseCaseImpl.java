package com.subox.inventario.cliente_service.application.usecase.ubicacion;

import java.util.List;

import org.springframework.stereotype.Service;

import com.subox.inventario.cliente_service.domain.model.ubicacion.Comuna;
import com.subox.inventario.cliente_service.port.in.ubicacion.ComunaUseCase;
import com.subox.inventario.cliente_service.port.out.ubicacion.ComunaRepositoryPort;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ComunaUseCaseImpl implements ComunaUseCase{

    private final ComunaRepositoryPort repository;

      @Override
      public List<Comuna> listarPorProvinciaId(Long provinciaId) {
            return repository.listarPorProvinciaId(provinciaId);
      }
}
