package com.subox.inventario.cliente_service.application.usecase.cliente;

import org.springframework.stereotype.Service;

import com.subox.inventario.cliente_service.domain.model.actores.Cliente;
import com.subox.inventario.cliente_service.port.in.cliente.ActualizarClienteUseCase;
import com.subox.inventario.cliente_service.port.out.cliente.ClienteRepositoryPort;

import java.util.Optional;

@Service
public class ActualizarClienteUseCaseImpl implements ActualizarClienteUseCase {
    private final ClienteRepositoryPort repository;

    public ActualizarClienteUseCaseImpl(ClienteRepositoryPort repository) {
        this.repository = repository;
    }

    @Override
    public Cliente execute(Long id, Cliente cliente) {
        Optional<Cliente> existing = repository.findById(id);
        if (existing.isEmpty()) {
            throw new RuntimeException("Cliente no encontrado");
        }
        Cliente toUpdate = existing.get();
        toUpdate.setNombre(cliente.getNombre());
        toUpdate.setRut(cliente.getRut());
        return repository.save(toUpdate);
    }
}

