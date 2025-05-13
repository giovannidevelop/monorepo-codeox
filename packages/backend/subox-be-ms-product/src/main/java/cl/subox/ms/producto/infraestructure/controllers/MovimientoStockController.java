package cl.subox.ms.producto.infraestructure.controllers;


import cl.subox.ms.producto.domain.entities.entity.MovimientoStock;
import cl.subox.ms.producto.infraestructure.service.MovimientoStockService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movimientos")
@RequiredArgsConstructor
public class MovimientoStockController {

    private final MovimientoStockService movimientoStockService;

    @GetMapping
    public List<MovimientoStock> listarMovimientos() {
        return movimientoStockService.listarMovimientos();
    }

    @PostMapping
    public MovimientoStock registrarMovimiento(@RequestBody MovimientoStock movimiento) {
        return movimientoStockService.registrarMovimiento(movimiento);
    }
}
