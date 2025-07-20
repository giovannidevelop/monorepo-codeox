package cl.subox.ms.producto.infraestructure.repository;

import cl.subox.ms.producto.domain.entities.entity.Calidad;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CalidadRepository extends JpaRepository<Calidad, Long> {
}
