package cl.subox.ms.producto.infraestructure.controllers;

import cl.subox.ms.producto.domain.entities.entity.Calidad;
import cl.subox.ms.producto.infraestructure.service.CalidadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "*") 
@RestController
@RequestMapping("/calidades")
public class CalidadController {

    @Autowired
    private CalidadService calidadService;

    @GetMapping
    public ResponseEntity<List<Calidad>> listarTodas() {
        return ResponseEntity.ok(calidadService.listarTodas());
    }

    @PostMapping
    public ResponseEntity<Calidad> guardar(@RequestBody Calidad calidad) {
        Calidad nueva = calidadService.guardar(calidad);
        return ResponseEntity.ok(nueva);
    }
}
