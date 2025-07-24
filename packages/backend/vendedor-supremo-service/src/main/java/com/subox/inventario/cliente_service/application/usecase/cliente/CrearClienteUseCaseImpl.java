package com.subox.inventario.cliente_service.application.usecase.cliente;


import org.springframework.stereotype.Service;

import com.subox.inventario.cliente_service.domain.model.actores.Cliente;
import com.subox.inventario.cliente_service.port.in.cliente.CrearClienteUseCase;
import com.subox.inventario.cliente_service.port.out.cliente.ClienteRepositoryPort;

@Service
public class CrearClienteUseCaseImpl implements CrearClienteUseCase {
    private final ClienteRepositoryPort repository;

    public CrearClienteUseCaseImpl(ClienteRepositoryPort repository) {
        this.repository = repository;
    }

    @Override
    public Cliente execute(Cliente cliente) {
        return repository.save(cliente);
    }
}
