package cl.subox.ms.producto.infraestructure.controllers;

import cl.subox.ms.producto.domain.entities.entity.Marca;
import cl.subox.ms.producto.infraestructure.service.MarcaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/marcas")
public class MarcaController {

    @Autowired
    private MarcaService marcaService;

    @GetMapping
    public ResponseEntity<List<Marca>> listarTodas() {
        return ResponseEntity.ok(marcaService.listarTodas());
    }

    @PostMapping
    public ResponseEntity<Marca> guardar(@RequestBody Marca marca) {
        Marca nueva = marcaService.guardar(marca);
        return ResponseEntity.ok(nueva);
    }
}
