package cl.subox.ms.producto.infraestructure.service;


import cl.subox.ms.producto.domain.entities.entity.Categoria;
import cl.subox.ms.producto.infraestructure.repository.CategoriaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoriaService {

    private final CategoriaRepository categoriaRepository;

    public List<Categoria> listarCategorias() {
        return categoriaRepository.findAll();
    }

    public Optional<Categoria> obtenerCategoriaPorId(Long id) {
        return categoriaRepository.findById(id);
    }

    public Categoria crearCategoria(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    public Categoria actualizarCategoria(Long id, Categoria categoriaActualizada) {
        return categoriaRepository.findById(id)
            .map(categoria -> {
                categoria.setNombre(categoriaActualizada.getNombre());
                categoria.setDescription(categoriaActualizada.getDescription());
                return categoriaRepository.save(categoria);
            })
            .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));
    }

    public void eliminarCategoria(Long id) {
        categoriaRepository.deleteById(id);
    }
}
