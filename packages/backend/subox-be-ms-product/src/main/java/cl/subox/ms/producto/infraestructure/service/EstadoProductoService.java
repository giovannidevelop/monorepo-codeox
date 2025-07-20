package cl.subox.ms.producto.infraestructure.service;

import java.util.List;

import cl.subox.ms.producto.domain.entities.entity.EstadoProducto;

public interface EstadoProductoService {
   List<EstadoProducto> listarTodas();
    EstadoProducto guardar(EstadoProducto marca);
}