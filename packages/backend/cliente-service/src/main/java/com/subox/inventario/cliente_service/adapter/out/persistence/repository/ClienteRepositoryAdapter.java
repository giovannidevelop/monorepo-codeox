package com.subox.inventario.cliente_service.adapter.out.persistence.repository;


import org.springframework.stereotype.Component;

import com.subox.inventario.cliente_service.adapter.out.persistence.entity.ClienteEntity;
import com.subox.inventario.cliente_service.adapter.out.persistence.jpa.ClienteJpaRepository;
import com.subox.inventario.cliente_service.domain.model.actores.Cliente;
import com.subox.inventario.cliente_service.port.out.cliente.ClienteRepositoryPort;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class ClienteRepositoryAdapter implements ClienteRepositoryPort {
    private final ClienteJpaRepository jpaRepository;

    public ClienteRepositoryAdapter(ClienteJpaRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    private Cliente mapToModel(ClienteEntity entity) {
        return new Cliente(
        );
    }

    private ClienteEntity mapToEntity(Cliente cliente) {
        return new ClienteEntity(
      
        );
    }

    @Override
    public Cliente save(Cliente cliente) {
        ClienteEntity saved = jpaRepository.save(mapToEntity(cliente));
        return mapToModel(saved);
    }

    @Override
    public Optional<Cliente> findById(Long id) {
        return jpaRepository.findById(id).map(this::mapToModel);
    }

    @Override
    public List<Cliente> findAll() {
        return jpaRepository.findAll().stream()
                   .map(this::mapToModel)
                   .collect(Collectors.toList());
    }

    @Override
    public void deleteById(Long id) {
        jpaRepository.deleteById(id);
    }
}
