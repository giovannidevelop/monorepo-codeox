package com.subox.inventario.cliente_service.port.out.ubicacion;

import java.util.List;

import com.subox.inventario.cliente_service.domain.model.ubicacion.Comuna;

public interface ComunaRepositoryPort {
      List<Comuna> listarPorProvinciaId(Long provinciaId);
}
