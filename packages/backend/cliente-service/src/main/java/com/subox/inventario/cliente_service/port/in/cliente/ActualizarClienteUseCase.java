package com.subox.inventario.cliente_service.port.in.cliente;

import com.subox.inventario.cliente_service.domain.model.actores.Cliente;

public interface ActualizarClienteUseCase {
    Cliente execute(Long id, Cliente cliente);
}
