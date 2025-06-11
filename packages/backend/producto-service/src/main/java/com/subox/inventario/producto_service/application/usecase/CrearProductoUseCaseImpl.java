package com.subox.inventario.producto_service.application.usecase;


import org.springframework.stereotype.Service;

import com.subox.inventario.producto_service.domain.model.Producto;
import com.subox.inventario.producto_service.port.in.CrearProductoUseCase;
import com.subox.inventario.producto_service.port.out.ProductoRepositoryPort;

@Service
public class CrearProductoUseCaseImpl implements CrearProductoUseCase {
    private final ProductoRepositoryPort repository;

    public CrearProductoUseCaseImpl(ProductoRepositoryPort repository) {
        this.repository = repository;
    }

    @Override
    public Producto execute(Producto producto) {
        return repository.save(producto);
    }
}
