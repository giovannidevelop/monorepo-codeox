package com.subox.inventario.producto_service.adapter.in.web;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.subox.inventario.producto_service.adapter.in.web.dto.ProductoRequest;
import com.subox.inventario.producto_service.adapter.in.web.dto.ProductoResponse;
import com.subox.inventario.producto_service.adapter.in.web.mapper.ProductoMapper;
import com.subox.inventario.producto_service.domain.model.Producto;
import com.subox.inventario.producto_service.port.in.ActualizarProductoUseCase;
import com.subox.inventario.producto_service.port.in.CrearProductoUseCase;
import com.subox.inventario.producto_service.port.in.EliminarProductoUseCase;
import com.subox.inventario.producto_service.port.in.ListarProductoUseCase;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "*")
public class ProductoController {

    private final CrearProductoUseCase crearUseCase;
    private final ListarProductoUseCase listarUseCase;
    private final ActualizarProductoUseCase actualizarUseCase;
    private final EliminarProductoUseCase eliminarUseCase;
    private final ProductoMapper mapper;

    public ProductoController(CrearProductoUseCase crearUseCase,
                             ListarProductoUseCase listarUseCase,
                             ActualizarProductoUseCase actualizarUseCase,
                             EliminarProductoUseCase eliminarUseCase,
                             ProductoMapper mapper) {
        this.crearUseCase = crearUseCase;
        this.listarUseCase = listarUseCase;
        this.actualizarUseCase = actualizarUseCase;
        this.eliminarUseCase = eliminarUseCase;
        this.mapper = mapper;
    }

    @GetMapping
    public List<ProductoResponse> listAll() {
        List<Producto> productos = listarUseCase.execute();
        return productos.stream()
            .map(mapper::toResponse)
            .collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity<ProductoResponse> create(@RequestBody ProductoRequest request) {
        Producto producto = mapper.toModel(request);
        Producto created = crearUseCase.execute(producto);
        return ResponseEntity.ok(mapper.toResponse(created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductoResponse> update(@PathVariable Long id,
                                                   @RequestBody ProductoRequest request) {
        Producto producto = mapper.toModel(id, request);
        Producto updated = actualizarUseCase.execute(id, producto);
        return ResponseEntity.ok(mapper.toResponse(updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        eliminarUseCase.execute(id);
        return ResponseEntity.noContent().build();
    }
}
