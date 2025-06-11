package com.subox.inventario.producto_service.adapter.in.web.mapper;

import org.springframework.stereotype.Component;

import com.subox.inventario.producto_service.adapter.in.web.dto.ProductoRequest;
import com.subox.inventario.producto_service.adapter.in.web.dto.ProductoResponse;
import com.subox.inventario.producto_service.domain.model.Producto;

@Component
public class ProductoMapper {

    public Producto toModel(ProductoRequest request) {
        return new Producto(
                null,
                request.getNombre(),
                request.getCodigoBarras(),
                request.getDescripcion(),
                request.getPrecioCompra(),
                request.getPrecioVenta(),
                request.getStock(),
                request.getFechaIngreso());
    }

    public ProductoResponse toResponse(Producto producto) {
        return new ProductoResponse(
                producto.getId(),
                producto.getNombre(),
                producto.getCodigoBarras(),
                producto.getDescripcion(),
                producto.getPrecioCompra(),
                producto.getPrecioVenta(),
                producto.getStock(),
                producto.getFechaIngreso());
    }

    public Producto toModel(Long id, ProductoRequest request) {
        return new Producto(
                id,
                request.getNombre(),
                request.getCodigoBarras(),
                request.getDescripcion(),
                request.getPrecioCompra(),
                request.getPrecioVenta(),
                request.getStock(),
                request.getFechaIngreso());
    }
}
