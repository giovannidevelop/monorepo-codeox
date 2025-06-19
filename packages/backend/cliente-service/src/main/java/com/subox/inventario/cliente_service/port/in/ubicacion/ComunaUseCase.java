package com.subox.inventario.cliente_service.port.in.ubicacion;

import java.util.List;

import com.subox.inventario.cliente_service.domain.model.ubicacion.Comuna;

public interface ComunaUseCase {
      List<Comuna> listarPorProvinciaId(Long provinciaId);
}
