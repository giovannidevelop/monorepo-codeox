package cl.subox.ms.producto.infraestructure.repository;

import cl.subox.ms.producto.domain.entities.entity.Marca;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MarcaRepository extends JpaRepository<Marca, Long> {
     boolean existsByNombreIgnoreCase(String nombre);
}
