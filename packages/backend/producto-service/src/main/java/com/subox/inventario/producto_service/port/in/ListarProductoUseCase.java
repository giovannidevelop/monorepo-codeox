package com.subox.inventario.producto_service.port.in;

import java.util.List;

import com.subox.inventario.producto_service.domain.model.Producto;

public interface ListarProductoUseCase {
    List<Producto> execute();
}
