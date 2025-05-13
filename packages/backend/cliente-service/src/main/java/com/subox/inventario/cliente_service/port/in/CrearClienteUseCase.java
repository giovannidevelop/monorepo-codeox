
package com.subox.inventario.cliente_service.port.in;

import com.subox.inventario.cliente_service.domain.model.Cliente;

public interface CrearClienteUseCase {
    Cliente execute(Cliente cliente);
}
