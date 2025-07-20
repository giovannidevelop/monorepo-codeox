package cl.subox.ms.producto.infraestructure.service;

import cl.subox.ms.producto.domain.entities.entity.Categoria;

import java.util.List;
import java.util.Optional;

public interface CategoriaService {

    List<Categoria> listarTodas();

    Categoria guardar(Categoria categoria);

    Optional<Categoria> buscarPorId(Long id);

    boolean existePorNombre(String nombre);

    void eliminarPorId(Long id);
}
