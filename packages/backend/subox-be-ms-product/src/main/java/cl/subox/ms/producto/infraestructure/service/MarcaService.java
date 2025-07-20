package cl.subox.ms.producto.infraestructure.service;

import java.util.List;

import cl.subox.ms.producto.domain.entities.entity.Marca;

public interface MarcaService {
   List<Marca> listarTodas();
    Marca guardar(Marca marca);
}