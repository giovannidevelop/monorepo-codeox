package cl.subox.ms.producto.infraestructure.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import cl.subox.ms.producto.domain.entities.entity.MovimientoStock;
import cl.subox.ms.producto.domain.enums.TipoMovimiento;
@Repository
public interface MovimientoStockRepository extends JpaRepository<MovimientoStock, Long> {
    List<MovimientoStock> findByPrendaId(Long prendaId);
    List<MovimientoStock> findByTipo(TipoMovimiento tipo);
}
