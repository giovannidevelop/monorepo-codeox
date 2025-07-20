package cl.subox.ms.producto.infraestructure.controllers;

import cl.subox.ms.producto.domain.entities.entity.Categoria;
import cl.subox.ms.producto.infraestructure.service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categorias")
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;

    @GetMapping
    public ResponseEntity<List<Categoria>> listarTodas() {
        return ResponseEntity.ok(categoriaService.listarTodas());
    }

    @PostMapping
    public ResponseEntity<Categoria> guardar(@RequestBody Categoria categoria) {
        Categoria nueva = categoriaService.guardar(categoria);
        return ResponseEntity.ok(nueva);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Categoria> buscarPorId(@PathVariable Long id) {
        return categoriaService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Categoria> editar(@PathVariable Long id, @RequestBody Categoria nuevaData) {
        return categoriaService.buscarPorId(id).map(existente -> {
            existente.setNombre(nuevaData.getNombre());
            existente.setDescripcion(nuevaData.getDescripcion());
            return ResponseEntity.ok(categoriaService.guardar(existente));
        }).orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}/nombre")
    public ResponseEntity<Categoria> actualizarNombre(@PathVariable Long id, @RequestParam String nombre) {
        return categoriaService.buscarPorId(id).map(categoria -> {
            categoria.setNombre(nombre);
            return ResponseEntity.ok(categoriaService.guardar(categoria));
        }).orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}/descripcion")
    public ResponseEntity<Categoria> actualizarDescripcion(@PathVariable Long id, @RequestParam String descripcion) {
        return categoriaService.buscarPorId(id).map(categoria -> {
            categoria.setDescripcion(descripcion);
            return ResponseEntity.ok(categoriaService.guardar(categoria));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        categoriaService.eliminarPorId(id);
        return ResponseEntity.noContent().build();
    }
}
