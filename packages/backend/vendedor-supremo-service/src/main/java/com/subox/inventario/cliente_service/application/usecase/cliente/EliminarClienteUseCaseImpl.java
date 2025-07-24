package com.subox.inventario.cliente_service.application.usecase.cliente;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.subox.inventario.cliente_service.domain.model.actores.Cliente;
import com.subox.inventario.cliente_service.port.in.cliente.EliminarClienteUseCase;
import com.subox.inventario.cliente_service.port.out.cliente.ClienteRepositoryPort;

@Service
public class EliminarClienteUseCaseImpl implements EliminarClienteUseCase {
    private final ClienteRepositoryPort repository;

    public EliminarClienteUseCaseImpl(ClienteRepositoryPort repository) {
        this.repository = repository;
    }

    @Override
    public void execute(Long id) {
        Optional<Cliente> clienteOpt = repository.findById(id);
        if (clienteOpt.isEmpty()) {
            throw new ClienteNoEncontradoException("Cliente no encontrado con ID: " + id);
        }
        repository.deleteById(id);
    }
}
