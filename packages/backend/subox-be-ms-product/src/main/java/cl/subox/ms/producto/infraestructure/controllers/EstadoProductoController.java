package cl.subox.ms.producto.infraestructure.controllers;

import cl.subox.ms.producto.domain.entities.entity.EstadoProducto;
import cl.subox.ms.producto.infraestructure.service.EstadoProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*") 
@RestController
@RequestMapping("/estadoProductos")
public class EstadoProductoController {

    @Autowired
    private EstadoProductoService estadoProductoService;

    @GetMapping
    public ResponseEntity<List<EstadoProducto>> listarTodas() {
        return ResponseEntity.ok(estadoProductoService.listarTodas());
    }

    @PostMapping
    public ResponseEntity<EstadoProducto> guardar(@RequestBody EstadoProducto estadoProducto) {
        EstadoProducto nueva = estadoProductoService.guardar(estadoProducto);
        return ResponseEntity.ok(nueva);
    }
}
