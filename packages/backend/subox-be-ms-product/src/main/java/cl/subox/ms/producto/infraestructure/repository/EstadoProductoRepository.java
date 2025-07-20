package cl.subox.ms.producto.infraestructure.repository;

import cl.subox.ms.producto.domain.entities.entity.EstadoProducto;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EstadoProductoRepository extends JpaRepository<EstadoProducto, Long> {
     boolean existsByEstadoIgnoreCase(String nombre);
}
