package com.subox.inventario.producto_service.application.usecase;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.subox.inventario.producto_service.domain.model.Producto;
import com.subox.inventario.producto_service.port.in.EliminarProductoUseCase;
import com.subox.inventario.producto_service.port.out.ProductoRepositoryPort;

@Service
public class EliminarProductoUseCaseImpl implements EliminarProductoUseCase {
    private final ProductoRepositoryPort repository;

    public EliminarProductoUseCaseImpl(ProductoRepositoryPort repository) {
        this.repository = repository;
    }

    @Override
    public void execute(Long id) {
        Optional<Producto> clienteOpt = repository.findById(id);
        if (clienteOpt.isEmpty()) {
            throw new ProductoNoEncontradoException("Producto no encontrado con ID: " + id);
        }
        repository.deleteById(id);
    }
}
