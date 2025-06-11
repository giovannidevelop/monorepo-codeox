package com.subox.inventario.producto_service.application.usecase;

import org.springframework.stereotype.Service;

import com.subox.inventario.producto_service.domain.model.Producto;
import com.subox.inventario.producto_service.port.in.ActualizarProductoUseCase;
import com.subox.inventario.producto_service.port.out.ProductoRepositoryPort;

import java.util.Optional;

@Service
public class ActualizarProductoUseCaseImpl implements ActualizarProductoUseCase {
    private final ProductoRepositoryPort repository;

    public ActualizarProductoUseCaseImpl(ProductoRepositoryPort repository) {
        this.repository = repository;
    }

    @Override
    public Producto execute(Long id, Producto producto) {
        Optional<Producto> existing = repository.findById(id);
        if (existing.isEmpty()) {
            throw new RuntimeException("Producto no encontrado");
        }
        Producto toUpdate = existing.get();
        toUpdate.setNombre(producto.getNombre());
        toUpdate.setDescripcion(producto.getDescripcion());
        toUpdate.setFechaIngreso(producto.getFechaIngreso());
        toUpdate.setId(producto.getId());
        toUpdate.setPrecioCompra(producto.getPrecioCompra());
        toUpdate.setPrecioVenta(producto.getPrecioVenta());
        toUpdate.setStock(producto.getStock());
        return repository.save(toUpdate);
    }
}

