package com.subox.inventario.cliente_service.port.in.ubicacion;

import java.util.List;

import com.subox.inventario.cliente_service.domain.model.ubicacion.Region;

public interface RegionUseCase {
    List<Region> findAll();
}
