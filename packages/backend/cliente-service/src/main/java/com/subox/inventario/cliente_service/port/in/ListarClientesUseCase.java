package com.subox.inventario.cliente_service.port.in;

import java.util.List;

import com.subox.inventario.cliente_service.domain.model.Cliente;

public interface ListarClientesUseCase {
    List<Cliente> execute();
}
