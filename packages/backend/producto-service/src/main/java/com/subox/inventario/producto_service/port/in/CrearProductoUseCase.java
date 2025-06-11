
package com.subox.inventario.producto_service.port.in;

import com.subox.inventario.producto_service.domain.model.Producto;

public interface CrearProductoUseCase {
    Producto execute(Producto producto);
}
