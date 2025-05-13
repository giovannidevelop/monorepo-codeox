package com.subox.inventario.cliente_service.application.usecase;

import org.springframework.stereotype.Service;

import com.subox.inventario.cliente_service.domain.model.Cliente;
import com.subox.inventario.cliente_service.port.in.ActualizarClienteUseCase;
import com.subox.inventario.cliente_service.port.out.ClienteRepositoryPort;

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
        toUpdate.setTelefono(cliente.getTelefono());
        toUpdate.setEmail(cliente.getEmail());
        toUpdate.setDireccion(cliente.getDireccion());
        return repository.save(toUpdate);
    }
}

