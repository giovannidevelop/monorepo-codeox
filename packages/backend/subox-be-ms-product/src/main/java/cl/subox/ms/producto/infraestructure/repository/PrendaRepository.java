package cl.subox.ms.producto.infraestructure.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import cl.subox.ms.producto.domain.entities.entity.Prenda;
import cl.subox.ms.producto.domain.enums.EstadoVenta;

@Repository
public interface PrendaRepository extends JpaRepository<Prenda, Long> {
    List<Prenda> findByEstadoVenta(EstadoVenta estadoVenta);
    List<Prenda> findByFardoId(Long fardoId);
    List<Prenda> findByUbicacionId(Long ubicacionId);
}
