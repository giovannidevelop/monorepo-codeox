package com.subox.inventario.producto_service.adapter.out.persistence.repository;


import org.springframework.stereotype.Component;

import com.subox.inventario.producto_service.adapter.out.persistence.entity.ProductoEntity;
import com.subox.inventario.producto_service.adapter.out.persistence.jpa.ProductoJpaRepository;
import com.subox.inventario.producto_service.domain.model.Producto;
import com.subox.inventario.producto_service.port.out.ProductoRepositoryPort;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class ProductoRepositoryAdapter implements ProductoRepositoryPort {
    private final ProductoJpaRepository jpaRepository;

    public ProductoRepositoryAdapter(ProductoJpaRepository jpaRepository) {
        this.jpaRepository = jpaRepository;
    }

    private Producto mapToModel(ProductoEntity entity) {
        return new Producto(
            entity.getId(),
            entity.getCodigoBarras(),
            entity.getNombre(),             
            entity.getDescripcion(),
            entity.getPrecioCompra(),
            entity.getPrecioVenta(),
            entity.getStock(),
            entity.getFechaIngreso()
        );
    }

    private ProductoEntity mapToEntity(Producto producto) {
        return new ProductoEntity(
            producto.getId(),
            producto.getCodigoBarras(),
            producto.getNombre(),             
            producto.getDescripcion(),
            producto.getPrecioCompra(),
            producto.getPrecioVenta(),
            producto.getStock(),
            producto.getFechaIngreso()
        );
    }

    @Override
    public Producto save(Producto producto) {
        ProductoEntity saved = jpaRepository.save(mapToEntity(producto));
        return mapToModel(saved);
    }

    @Override
    public Optional<Producto> findById(Long id) {
        return jpaRepository.findById(id).map(this::mapToModel);
    }

    @Override
    public List<Producto> findAll() {
        return jpaRepository.findAll().stream()
                   .map(this::mapToModel)
                   .collect(Collectors.toList());
    }

    @Override
    public void deleteById(Long id) {
        jpaRepository.deleteById(id);
    }
}
