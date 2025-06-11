package com.subox.inventario.producto_service.application.usecase;

import java.util.List;

import org.springframework.stereotype.Service;

import com.subox.inventario.producto_service.domain.model.Producto;
import com.subox.inventario.producto_service.port.in.ListarProductoUseCase;
import com.subox.inventario.producto_service.port.out.ProductoRepositoryPort;

@Service
public class ListarProductoUseCaseImpl implements ListarProductoUseCase {
    private final ProductoRepositoryPort repository;

    public ListarProductoUseCaseImpl(ProductoRepositoryPort repository) {
        this.repository = repository;
    }

    @Override
    public List<Producto> execute() {
        return repository.findAll();
    }
}

