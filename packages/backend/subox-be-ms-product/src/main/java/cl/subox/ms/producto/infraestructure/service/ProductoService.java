package cl.subox.ms.producto.infraestructure.service;

import cl.subox.ms.producto.domain.entities.entity.Producto;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface ProductoService {

    // CRUD
    Producto agregarProducto(Producto producto);
    Producto editarProducto(Long id, Producto producto);
    boolean eliminarProducto(Long id);
    List<Producto> obtenerTodosLosProductos();
    Optional<Producto> obtenerProductoPorId(Long id);

    // Consultas avanzadas
    List<Producto> obtenerProductosPorCategoria(Long categoriaId);
    List<Producto> buscarProductosPorNombre(String nombre);
    List<Producto> obtenerProductosConStockMenorA(int cantidad);

    // Stock y precios
    Producto actualizarStock(Long id, int nuevoStock);
    Producto actualizarPrecioVenta(Long id, BigDecimal nuevoPrecio);

    // Inventario
    void registrarEntradaInventario(Long id, int cantidad, String motivo);
    void registrarSalidaInventario(Long id, int cantidad, String motivo);
}
