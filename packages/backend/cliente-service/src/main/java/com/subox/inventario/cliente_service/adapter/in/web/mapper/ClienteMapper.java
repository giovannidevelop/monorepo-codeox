package com.subox.inventario.cliente_service.adapter.in.web.mapper;


import org.springframework.stereotype.Component;

import com.subox.inventario.cliente_service.adapter.in.web.dto.ClienteRequest;
import com.subox.inventario.cliente_service.adapter.in.web.dto.ClienteResponse;
import com.subox.inventario.cliente_service.domain.model.Cliente;

@Component
public class ClienteMapper {

    public Cliente toModel(ClienteRequest request) {
        return new Cliente(
            null,
            request.getNombre(),
            request.getRut(),
            request.getTelefono(),
            request.getEmail(),
            request.getDireccion()
        );
    }

    public ClienteResponse toResponse(Cliente cliente) {
        return new ClienteResponse(
            cliente.getId(),
            cliente.getNombre(),
            cliente.getRut(),
            cliente.getTelefono(),
            cliente.getEmail(),
            cliente.getDireccion()
        );
    }

    public Cliente toModel(Long id, ClienteRequest request) {
        return new Cliente(
            id,
            request.getNombre(),
            request.getRut(),
            request.getTelefono(),
            request.getEmail(),
            request.getDireccion()
        );
    }
}

