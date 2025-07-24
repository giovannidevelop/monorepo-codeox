package com.subox.inventario.cliente_service.port.out.cliente;

import java.util.List;
import java.util.Optional;

import com.subox.inventario.cliente_service.domain.model.actores.Cliente;

public interface ClienteRepositoryPort {
    Cliente save(Cliente cliente);
    Optional<Cliente> findById(Long id);
    List<Cliente> findAll();
    void deleteById(Long id);
}