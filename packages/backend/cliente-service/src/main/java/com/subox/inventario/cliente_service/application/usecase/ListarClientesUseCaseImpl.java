package com.subox.inventario.cliente_service.application.usecase;

import java.util.List;

import org.springframework.stereotype.Service;

import com.subox.inventario.cliente_service.domain.model.Cliente;
import com.subox.inventario.cliente_service.port.in.ListarClientesUseCase;
import com.subox.inventario.cliente_service.port.out.ClienteRepositoryPort;

@Service
public class ListarClientesUseCaseImpl implements ListarClientesUseCase {
    private final ClienteRepositoryPort repository;

    public ListarClientesUseCaseImpl(ClienteRepositoryPort repository) {
        this.repository = repository;
    }

    @Override
    public List<Cliente> execute() {
        return repository.findAll();
    }
}

