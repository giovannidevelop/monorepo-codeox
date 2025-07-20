package cl.subox.ms.producto.infraestructure.service.imple;

import cl.subox.ms.producto.domain.entities.entity.Producto;
import cl.subox.ms.producto.infraestructure.repository.ProductoRepository;
import cl.subox.ms.producto.infraestructure.service.ProductoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@Slf4j
public class ProductoServiceImpl implements ProductoService {

    private final ProductoRepository productoRepository;

    public ProductoServiceImpl(ProductoRepository productoRepository) {
        this.productoRepository = productoRepository;
    }

    @Override
    public Producto agregarProducto(Producto producto) {
        log.info("Agregando producto: {}", producto.getNombre());
        return productoRepository.save(producto);
    }

    @Override
    public Producto editarProducto(Long id, Producto productoActualizado) {
        return productoRepository.findById(id)
                .map(producto -> {
                    log.info("Editando producto con ID: {}", id);
                    producto.setNombre(productoActualizado.getNombre());
                    producto.setDescripcion(productoActualizado.getDescripcion());
                    producto.setPrecioCompra(productoActualizado.getPrecioCompra());
                    producto.setPrecioVenta(productoActualizado.getPrecioVenta());
                    producto.setStock(productoActualizado.getStock());
                    producto.setFechaIngreso(productoActualizado.getFechaIngreso());
                    producto.setCategoria(productoActualizado.getCategoria());
                    producto.setMarca(productoActualizado.getMarca());
                    producto.setCalidad(productoActualizado.getCalidad());
                    producto.setEstadoProducto(productoActualizado.getEstadoProducto());
                    return productoRepository.save(producto);
                })
                .orElseThrow(() -> {
                    log.warn("No se encontró el producto con ID: {}", id);
                    return new RuntimeException("Producto no encontrado");
                });
    }

    @Override
    public boolean eliminarProducto(Long id) {
        Optional<Producto> producto = productoRepository.findById(id);
        if (producto.isPresent()) {
            log.info("Eliminando producto con ID: {}", id);
            productoRepository.deleteById(id);
            return true;
        } else {
            log.warn("No se encontró el producto para eliminar con ID: {}", id);
            return false;
        }
    }

    @Override
    public List<Producto> obtenerTodosLosProductos() {
        log.info("Listando todos los productos");
        return StreamSupport
                .stream(productoRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Producto> obtenerProductoPorId(Long id) {
        log.info("Buscando producto por ID: {}", id);
        return productoRepository.findById(id);
    }

    @Override
    public List<Producto> obtenerProductosPorCategoria(Long categoriaId) {
        log.info("Buscando productos por categoría ID: {}", categoriaId);
        return productoRepository.findAll().stream()
                .filter(p -> p.getCategoria() != null && categoriaId.equals(p.getCategoria().getId()))
                .collect(Collectors.toList());
    }

    @Override
    public List<Producto> buscarProductosPorNombre(String nombre) {
        log.info("Buscando productos que contienen en nombre: {}", nombre);
        return productoRepository.findAll().stream()
                .filter(p -> p.getNombre() != null && p.getNombre().toLowerCase().contains(nombre.toLowerCase()))
                .collect(Collectors.toList());
    }

    @Override
    public List<Producto> obtenerProductosConStockMenorA(int cantidad) {
        log.info("Buscando productos con stock menor a: {}", cantidad);
        return productoRepository.findAll().stream()
                .filter(p -> p.getStock() < cantidad)
                .collect(Collectors.toList());
    }

    @Override
    public Producto actualizarStock(Long id, int nuevoStock) {
        return productoRepository.findById(id)
                .map(producto -> {
                    log.info("Actualizando stock de producto {} a {}", id, nuevoStock);
                    producto.setStock(nuevoStock);
                    return productoRepository.save(producto);
                })
                .orElseThrow(() -> {
                    log.warn("Producto no encontrado para actualizar stock: {}", id);
                    return new RuntimeException("Producto no encontrado");
                });
    }

    @Override
    public Producto actualizarPrecioVenta(Long id, BigDecimal nuevoPrecio) {
        return productoRepository.findById(id)
                .map(producto -> {
                    log.info("Actualizando precio de venta de producto {} a {}", id, nuevoPrecio);
                    producto.setPrecioVenta(nuevoPrecio);
                    return productoRepository.save(producto);
                })
                .orElseThrow(() -> {
                    log.warn("Producto no encontrado para actualizar precio: {}", id);
                    return new RuntimeException("Producto no encontrado");
                });
    }

    @Override
    public void registrarEntradaInventario(Long id, int cantidad, String motivo) {
        productoRepository.findById(id).ifPresentOrElse(producto -> {
            log.info("Entrada de inventario para producto {}: +{} unidades. Motivo: {}", id, cantidad, motivo);
            producto.setStock(producto.getStock() + cantidad);
            productoRepository.save(producto);
        }, () -> {
            log.warn("Producto no encontrado para registrar entrada de inventario: {}", id);
            throw new RuntimeException("Producto no encontrado");
        });
    }

    @Override
    public void registrarSalidaInventario(Long id, int cantidad, String motivo) {
        productoRepository.findById(id).ifPresentOrElse(producto -> {
            int nuevoStock = producto.getStock() - cantidad;
            if (nuevoStock < 0) {
                log.warn("Stock insuficiente para producto {}. Stock actual: {}, salida solicitada: {}", id, producto.getStock(), cantidad);
                throw new RuntimeException("Stock insuficiente");
            }
            log.info("Salida de inventario para producto {}: -{} unidades. Motivo: {}", id, cantidad, motivo);
            producto.setStock(nuevoStock);
            productoRepository.save(producto);
        }, () -> {
            log.warn("Producto no encontrado para registrar salida de inventario: {}", id);
            throw new RuntimeException("Producto no encontrado");
        });
    }
}
