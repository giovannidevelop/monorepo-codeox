package com.subox.inventario.cliente_service.adapter.in.web.ubicacion;



import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.subox.inventario.cliente_service.adapter.in.dto.ubicacion.UbicacionRequest;
import com.subox.inventario.cliente_service.adapter.in.dto.ubicacion.UbicacionResponse;
import com.subox.inventario.cliente_service.adapter.in.mapper.ubicacion.UbicacionMapper;
import com.subox.inventario.cliente_service.domain.model.ubicacion.Comuna;
import com.subox.inventario.cliente_service.domain.model.ubicacion.Provincia;
import com.subox.inventario.cliente_service.domain.model.ubicacion.Region;
import com.subox.inventario.cliente_service.domain.model.ubicacion.Ubicacion;
import com.subox.inventario.cliente_service.port.in.ubicacion.ComunaUseCase;
import com.subox.inventario.cliente_service.port.in.ubicacion.ProvinciaUseCase;
import com.subox.inventario.cliente_service.port.in.ubicacion.RegionUseCase;
import com.subox.inventario.cliente_service.port.in.ubicacion.UbicacionUseCase;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/ubicaciones")
@CrossOrigin(origins = "*")
public class UbicacionController {

    private final UbicacionUseCase ubicacionUseCase;
    private final RegionUseCase regionUseCase;
    private final ProvinciaUseCase provinciaUseCase;
    private final ComunaUseCase comunaUseCase;
    private final UbicacionMapper mapper;

    public UbicacionController(UbicacionUseCase ubicacionUseCase,
                               RegionUseCase regionUseCase,
                               ProvinciaUseCase provinciaUseCase,
                               ComunaUseCase comunaUseCase,
                               UbicacionMapper mapper) {
        this.ubicacionUseCase = ubicacionUseCase;
        this.regionUseCase = regionUseCase;
        this.provinciaUseCase = provinciaUseCase;
        this.comunaUseCase = comunaUseCase;
        this.mapper = mapper;
    }

    // CRUD Ubicaciones
    @GetMapping
    public List<UbicacionResponse> listAll() {
        return ubicacionUseCase.findAll()
                .stream()
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

    // Extras para cascada Región > Provincia > Comuna

    @GetMapping("/regiones")
    public List<Region> listarRegiones() {
        return regionUseCase.findAll();
    }

    @GetMapping("/provincias")
    public List<Provincia> listarProvinciasPorRegion(@RequestParam Long regionId) {
        return provinciaUseCase.findByRegionId(regionId);
    }

    @GetMapping("/comunas")
    public List<Comuna> listarComunasPorProvincia(@RequestParam Long provinciaId) {
        return comunaUseCase.listarPorProvinciaId(provinciaId);
    }
}
