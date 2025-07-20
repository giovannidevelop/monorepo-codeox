package cl.subox.ms.producto.infraestructure.controllers;

import cl.subox.ms.producto.domain.entities.entity.Producto;
import cl.subox.ms.producto.infraestructure.service.ProductoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/productos")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") 
public class ProductoController {

    private final ProductoService productoService;

    // Crear producto
    @PostMapping
    public ResponseEntity<Producto> agregarProducto(@RequestBody Producto producto) {
        Producto nuevo = productoService.agregarProducto(producto);
        return ResponseEntity.ok(nuevo);
    }

    // Editar producto
    @PutMapping("/{id}")
    public ResponseEntity<Producto> editarProducto(@PathVariable Long id, @RequestBody Producto producto) {
        try {
            Producto actualizado = productoService.editarProducto(id, producto);
            return ResponseEntity.ok(actualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Eliminar producto
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarProducto(@PathVariable Long id) {
        boolean eliminado = productoService.eliminarProducto(id);
        return eliminado ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    // Obtener todos los productos
    @GetMapping
    public ResponseEntity<List<Producto>> obtenerTodos() {
        return ResponseEntity.ok(productoService.obtenerTodosLosProductos());
    }

    // Obtener por ID
    @GetMapping("/{id}")
    public ResponseEntity<Producto> obtenerPorId(@PathVariable Long id) {
        return productoService.obtenerProductoPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Buscar por nombre
    @GetMapping("/buscar")
    public ResponseEntity<List<Producto>> buscarPorNombre(@RequestParam String nombre) {
        return ResponseEntity.ok(productoService.buscarProductosPorNombre(nombre));
    }

    // Filtrar por categoría
    @GetMapping("/categoria/{categoriaId}")
    public ResponseEntity<List<Producto>> filtrarPorCategoria(@PathVariable Long categoriaId) {
        return ResponseEntity.ok(productoService.obtenerProductosPorCategoria(categoriaId));
    }

    // Filtrar por stock bajo
    @GetMapping("/stock/menor-a")
    public ResponseEntity<List<Producto>> filtrarPorStock(@RequestParam int cantidad) {
        return ResponseEntity.ok(productoService.obtenerProductosConStockMenorA(cantidad));
    }

    // Actualizar stock
    @PatchMapping("/{id}/stock")
    public ResponseEntity<Producto> actualizarStock(@PathVariable Long id, @RequestParam int cantidad) {
        try {
            return ResponseEntity.ok(productoService.actualizarStock(id, cantidad));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Actualizar precio de venta
    @PatchMapping("/{id}/precio")
    public ResponseEntity<Producto> actualizarPrecio(@PathVariable Long id, @RequestParam BigDecimal precio) {
        try {
            return ResponseEntity.ok(productoService.actualizarPrecioVenta(id, precio));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Registrar entrada de inventario
    @PostMapping("/{id}/entrada")
    public ResponseEntity<Void> registrarEntrada(@PathVariable Long id,
                                                 @RequestParam int cantidad,
                                                 @RequestParam String motivo) {
        try {
            productoService.registrarEntradaInventario(id, cantidad, motivo);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Registrar salida de inventario
    @PostMapping("/{id}/salida")
    public ResponseEntity<Void> registrarSalida(@PathVariable Long id,
                                                @RequestParam int cantidad,
                                                @RequestParam String motivo) {
        try {
            productoService.registrarSalidaInventario(id, cantidad, motivo);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
