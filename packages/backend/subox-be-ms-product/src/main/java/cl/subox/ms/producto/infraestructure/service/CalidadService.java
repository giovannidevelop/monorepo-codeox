package cl.subox.ms.producto.infraestructure.service;

import java.util.List;

import cl.subox.ms.producto.domain.entities.entity.Calidad;

public interface CalidadService {
   List<Calidad> listarTodas();
    Calidad guardar(Calidad calidad);
}