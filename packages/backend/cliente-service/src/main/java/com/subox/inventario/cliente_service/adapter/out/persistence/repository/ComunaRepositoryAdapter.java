package com.subox.inventario.cliente_service.adapter.out.persistence.repository;

import com.subox.inventario.cliente_service.adapter.out.persistence.entity.ubicacion.ComunaEntity;
import com.subox.inventario.cliente_service.adapter.out.persistence.jpa.ComunaRepository;
import com.subox.inventario.cliente_service.domain.model.ubicacion.Comuna;
import com.subox.inventario.cliente_service.port.out.ubicacion.ComunaRepositoryPort;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class ComunaRepositoryAdapter implements ComunaRepositoryPort {

    private final ComunaRepository comunaRepository;

    @Override
    public List<Comuna> listarPorProvinciaId(Long provinciaId) {
        return comunaRepository.findByProvinciaId(provinciaId)
                .stream()
                .map(ComunaEntity::toDomain) // asegúrate de tener este método en ComunaEntity
                .collect(Collectors.toList());
    }

}
