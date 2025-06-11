package cl.subox.ms.producto.infraestructure.service.imple;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import cl.subox.ms.producto.domain.entities.entity.Producto;
import cl.subox.ms.producto.infraestructure.repository.ProductoRepository;
import cl.subox.ms.producto.infraestructure.service.ProductoService;

@Service
public class ProductoServiceImpl implements ProductoService {

    @Autowired
    private ProductoRepository productoRepository;

    @Override
    public ResponseEntity<Producto> agregarProducto(Producto producto) {
        Producto guardado = productoRepository.save(producto);
        return ResponseEntity.ok(guardado);
    }

    @Override
    public ResponseEntity<Producto> editarProducto(String id, Producto producto) {
        Optional<Producto> existente = productoRepository.findById(Long.parseLong(id));
        if (existente.isPresent()) {
            producto.setId(existente.get().getId());
            Producto actualizado = productoRepository.save(producto);
            return ResponseEntity.ok(actualizado);
        }
        return ResponseEntity.notFound().build();
    }

    @Override
    public ResponseEntity<Producto> eliminarProducto(String id) {
        Optional<Producto> producto = productoRepository.findById(Long.parseLong(id));
        if (producto.isPresent()) {
            productoRepository.deleteById(Long.parseLong(id));
            return ResponseEntity.ok(producto.get());
        }
        return ResponseEntity.notFound().build();
    }

    @Override
    public ResponseEntity<List<Producto>> obtenerProductos() {
        List<Producto> productos = StreamSupport
            .stream(productoRepository.findAll().spliterator(), false)
            .collect(Collectors.toList());
        return ResponseEntity.ok(productos);
    }

    @Override
    public ResponseEntity<List<Producto>> obtenerProductoById(String id) {
        Optional<Producto> producto = productoRepository.findById(Long.parseLong(id));
        return producto.map(p -> ResponseEntity.ok(List.of(p)))
                       .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @Override
    public ResponseEntity<List<Producto>> obtenerProductosPorCategoria(String categoriaId) {
        // Debes implementar esto con un método custom en el repositorio
        throw new UnsupportedOperationException("Filtrado por categoría no implementado");
    }

    @Override
    public ResponseEntity<List<Producto>> buscarProductoPorNombre(String nombre) {
        // Debes implementar esto con un método custom en el repositorio
        throw new UnsupportedOperationException("Búsqueda por nombre no implementada");
    }

    @Override
    public ResponseEntity<List<Producto>> obtenerProductosPorStockMenorA(int cantidad) {
        // Debes implementar esto con un método custom en el repositorio
        throw new UnsupportedOperationException("Filtrado por stock no implementado");
    }

    @Override
    public ResponseEntity<Producto> actualizarStock(String id, int nuevoStock) {
        Optional<Producto> productoOpt = productoRepository.findById(Long.parseLong(id));
        if (productoOpt.isPresent()) {
            Producto producto = productoOpt.get();
            producto.setStock(nuevoStock);
            return ResponseEntity.ok(productoRepository.save(producto));
        }
        return ResponseEntity.notFound().build();
    }

    @Override
    public ResponseEntity<Producto> actualizarPrecioVenta(String id, double nuevoPrecio) {
        Optional<Producto> productoOpt = productoRepository.findById(Long.parseLong(id));
        if (productoOpt.isPresent()) {
            Producto producto = productoOpt.get();
            producto.setPrecioVenta(nuevoPrecio);
            return ResponseEntity.ok(productoRepository.save(producto));
        }
        return ResponseEntity.notFound().build();
    }

    @Override
    public ResponseEntity<Void> registrarEntradaInventario(String id, int cantidad, String motivo) {
        Optional<Producto> productoOpt = productoRepository.findById(Long.parseLong(id));
        if (productoOpt.isPresent()) {
            Producto producto = productoOpt.get();
            producto.setStock(producto.getStock() + cantidad);
            productoRepository.save(producto);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @Override
    public ResponseEntity<Void> registrarSalidaInventario(String id, int cantidad, String motivo) {
        Optional<Producto> productoOpt = productoRepository.findById(Long.parseLong(id));
        if (productoOpt.isPresent()) {
            Producto producto = productoOpt.get();
            producto.setStock(producto.getStock() - cantidad);
            productoRepository.save(producto);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
