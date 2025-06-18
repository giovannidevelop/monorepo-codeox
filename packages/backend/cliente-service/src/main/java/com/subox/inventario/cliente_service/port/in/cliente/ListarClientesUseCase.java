package com.subox.inventario.cliente_service.port.in.cliente;

import java.util.List;

import com.subox.inventario.cliente_service.domain.model.actores.Cliente;

public interface ListarClientesUseCase {
    List<Cliente> execute();
}
