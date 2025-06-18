package com.subox.inventario.cliente_service.adapter.in.web.ubicacion;

import com.subox.inventario.cliente_service.adapter.in.dto.ubicacion.UbicacionRequest;
import com.subox.inventario.cliente_service.adapter.in.dto.ubicacion.UbicacionResponse;
import com.subox.inventario.cliente_service.adapter.in.mapper.ubicacion.UbicacionMapper;
import com.subox.inventario.cliente_service.domain.model.ubicacion.Ubicacion;
import com.subox.inventario.cliente_service.port.in.ubicacion.UbicacionUseCase;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/ubicaciones")
@CrossOrigin(origins = "*")
public class UbicacionController {

    private final UbicacionUseCase ubicacionUseCase;
    private final UbicacionMapper mapper;

    public UbicacionController(UbicacionUseCase ubicacionUseCase,
                               UbicacionMapper mapper) {
        this.ubicacionUseCase = ubicacionUseCase;
        this.mapper = mapper;
    }

    @GetMapping
    public List<UbicacionResponse> listAll() {
        List<Ubicacion> ubicaciones = ubicacionUseCase.listarTodas();
        return ubicaciones.stream()
                .map(mapper::toResponse)
                .collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity<UbicacionResponse> create(@RequestBody UbicacionRequest request) {
        Ubicacion ubicacion = mapper.toModel(request);
        Ubicacion created = ubicacionUseCase.crear(ubicacion);
        return ResponseEntity.ok(mapper.toResponse(created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UbicacionResponse> update(@PathVariable Long id,
                                                    @RequestBody UbicacionRequest request) {
        Ubicacion ubicacion = mapper.toModel(id, request);
        Ubicacion updated = ubicacionUseCase.actualizar(id, ubicacion);
        return ResponseEntity.ok(mapper.toResponse(updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        ubicacionUseCase.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
