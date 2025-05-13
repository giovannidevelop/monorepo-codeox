package cl.subox.ms.producto.infraestructure.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import cl.subox.ms.producto.domain.entities.entity.Fardo;
import cl.subox.ms.producto.domain.enums.CategoriaFardo;
import cl.subox.ms.producto.domain.enums.EstadoFardo;

@Repository
public interface FardoRepository extends JpaRepository<Fardo, Long> {
    List<Fardo> findByEstado(EstadoFardo estado);
      List<Fardo> findByCategoria(CategoriaFardo categoria);
}
