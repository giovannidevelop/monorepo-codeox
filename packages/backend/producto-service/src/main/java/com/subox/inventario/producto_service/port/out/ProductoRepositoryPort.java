package com.subox.inventario.producto_service.port.out;

import java.util.List;
import java.util.Optional;

import com.subox.inventario.producto_service.domain.model.Producto;

public interface ProductoRepositoryPort {
    Producto save(Producto producto);
    Optional<Producto> findById(Long id);
    List<Producto> findAll();
    void deleteById(Long id);
}