package com.subox.inventario.cliente_service.adapter.in.mapper.cliente;


import org.springframework.stereotype.Component;

import com.subox.inventario.cliente_service.adapter.in.dto.cliente.ClienteRequest;
import com.subox.inventario.cliente_service.adapter.in.dto.cliente.ClienteResponse;
import com.subox.inventario.cliente_service.domain.model.actores.Cliente;

@Component
public class ClienteMapper {

    public Cliente toModel(ClienteRequest request) {
        return new Cliente();
    }

    public ClienteResponse toResponse(Cliente cliente) {
        return new ClienteResponse();
    }

    public Cliente toModel(Long id, ClienteRequest request) {
        return new Cliente();
    }
}

