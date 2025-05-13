package cl.subox.ms.producto.infraestructure.controllers;


import cl.subox.ms.producto.infraestructure.service.FardoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import cl.subox.ms.producto.domain.entities.entity.Fardo;
import cl.subox.ms.producto.domain.enums.CategoriaFardo;

@RestController
@RequestMapping("/api/fardos")
@RequiredArgsConstructor
public class FardoController {

    private final FardoService fardoService;

    @GetMapping
    public List<Fardo> listarFardos() {
        return fardoService.listarFardos();
    }

    @GetMapping("/categoria/{categoria}")
    public List<Fardo> listarFardosPorCategoria(@PathVariable CategoriaFardo categoria) {
        return fardoService.listarFardosPorCategoria(categoria);
    }

    @PostMapping
    public Fardo crearFardo(@RequestBody Fardo fardo) {
        return fardoService.crearFardo(fardo);
    }
}
