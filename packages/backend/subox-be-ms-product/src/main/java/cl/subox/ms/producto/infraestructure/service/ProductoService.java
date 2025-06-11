package cl.subox.ms.producto.infraestructure.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import cl.subox.ms.producto.domain.entities.entity.Producto;


public interface ProductoService {
    // CRUD
    ResponseEntity<Producto> agregarProducto(Producto producto);
    ResponseEntity<Producto> editarProducto(String id, Producto producto);
    ResponseEntity<Producto> eliminarProducto(String id);
    ResponseEntity<List<Producto>> obtenerProductos();
    ResponseEntity<List<Producto>> obtenerProductoById(String id);

    // Consultas avanzadas
    ResponseEntity<List<Producto>> obtenerProductosPorCategoria(String categoriaId);
    ResponseEntity<List<Producto>> buscarProductoPorNombre(String nombre);
    ResponseEntity<List<Producto>> obtenerProductosPorStockMenorA(int cantidad);

    // Stock y precios
    ResponseEntity<Producto> actualizarStock(String id, int nuevoStock);
    ResponseEntity<Producto> actualizarPrecioVenta(String id, double nuevoPrecio);

    // Inventario
    ResponseEntity<Void> registrarEntradaInventario(String id, int cantidad, String motivo);
    ResponseEntity<Void> registrarSalidaInventario(String id, int cantidad, String motivo);
    
}