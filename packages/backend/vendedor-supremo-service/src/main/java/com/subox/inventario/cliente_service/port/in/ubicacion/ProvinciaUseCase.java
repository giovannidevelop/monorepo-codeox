package com.subox.inventario.cliente_service.port.in.ubicacion;

import java.util.List;

import com.subox.inventario.cliente_service.domain.model.ubicacion.Provincia;

public interface ProvinciaUseCase {
    List<Provincia> findByRegionId(Long regionId);
}
