package cl.subox.ms.producto.infraestructure.service;

import org.springframework.http.ResponseEntity;

import cl.subox.ms.producto.domain.entities.entity.Producto;


public interface ProductoService {
    ResponseEntity<Producto> agregarProducto(Producto producto);

}
