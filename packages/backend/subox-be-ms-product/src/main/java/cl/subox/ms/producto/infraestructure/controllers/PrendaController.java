package cl.subox.ms.producto.infraestructure.controllers;

import cl.subox.ms.producto.domain.entities.entity.Prenda;
import cl.subox.ms.producto.domain.enums.EstadoVenta;
import cl.subox.ms.producto.infraestructure.service.PrendaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/prendas")
@RequiredArgsConstructor
public class PrendaController {

    private final PrendaService prendaService;

    @GetMapping
    public List<Prenda> listarPrendas() {
        return prendaService.listarPrendas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Prenda> obtenerPrenda(@PathVariable Long id) {
        return prendaService.obtenerPrendaPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Prenda crearPrenda(@RequestBody Prenda prenda) {
        return prendaService.crearPrenda(prenda);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Prenda> actualizarPrenda(@PathVariable Long id, @RequestBody Prenda prenda) {
        return ResponseEntity.ok(prendaService.actualizarPrenda(id, prenda));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarPrenda(@PathVariable Long id) {
        prendaService.eliminarPrenda(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/estado/{estado}")
    public List<Prenda> listarPrendasPorEstado(@PathVariable EstadoVenta estado) {
        return prendaService.listarPrendasPorEstado(estado);
    }
}
