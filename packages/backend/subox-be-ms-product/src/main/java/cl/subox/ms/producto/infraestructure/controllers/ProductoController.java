package cl.subox.ms.producto.infraestructure.controllers;


import cl.subox.ms.producto.domain.entities.entity.Producto;
import cl.subox.ms.producto.infraestructure.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/productos")
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    @PostMapping
    public ResponseEntity<Producto> agregarProducto(@RequestBody Producto producto) {
        return productoService.agregarProducto(producto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Producto> editarProducto(@PathVariable String id, @RequestBody Producto producto) {
        return productoService.editarProducto(id, producto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Producto> eliminarProducto(@PathVariable String id) {
        return productoService.eliminarProducto(id);
    }

    @GetMapping
    public ResponseEntity<List<Producto>> obtenerProductos() {
        return productoService.obtenerProductos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<Producto>> obtenerProductoPorId(@PathVariable String id) {
        return productoService.obtenerProductoById(id);
    }

    @GetMapping("/categoria/{categoriaId}")
    public ResponseEntity<List<Producto>> obtenerProductosPorCategoria(@PathVariable String categoriaId) {
        return productoService.obtenerProductosPorCategoria(categoriaId);
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<Producto>> buscarProductoPorNombre(@RequestParam("nombre") String nombre) {
        return productoService.buscarProductoPorNombre(nombre);
    }

    @GetMapping("/stock/menor-a/{cantidad}")
    public ResponseEntity<List<Producto>> obtenerProductosPorStockMenorA(@PathVariable int cantidad) {
        return productoService.obtenerProductosPorStockMenorA(cantidad);
    }

    @PatchMapping("/{id}/stock")
    public ResponseEntity<Producto> actualizarStock(@PathVariable String id, @RequestParam int cantidad) {
        return productoService.actualizarStock(id, cantidad);
    }

    @PatchMapping("/{id}/precio")
    public ResponseEntity<Producto> actualizarPrecioVenta(@PathVariable String id, @RequestParam double precio) {
        return productoService.actualizarPrecioVenta(id, precio);
    }

    @PostMapping("/{id}/entrada")
    public ResponseEntity<Void> registrarEntradaInventario(@PathVariable String id,
                                                           @RequestParam int cantidad,
                                                           @RequestParam String motivo) {
        return productoService.registrarEntradaInventario(id, cantidad, motivo);
    }

    @PostMapping("/{id}/salida")
    public ResponseEntity<Void> registrarSalidaInventario(@PathVariable String id,
                                                          @RequestParam int cantidad,
                                                          @RequestParam String motivo) {
        return productoService.registrarSalidaInventario(id, cantidad, motivo);
    }
}
