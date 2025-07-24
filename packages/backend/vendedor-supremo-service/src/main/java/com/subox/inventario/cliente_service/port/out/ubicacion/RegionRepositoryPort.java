package com.subox.inventario.cliente_service.port.out.ubicacion;


import java.util.List;

import com.subox.inventario.cliente_service.domain.model.ubicacion.Region;

public interface RegionRepositoryPort {
    List<Region> findAll();
}
