package cl.subox.ms.producto.infraestructure.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import cl.subox.ms.producto.domain.entities.entity.Producto;

@Repository
public interface ProductoRepository extends CrudRepository<Producto,Long> {

}
