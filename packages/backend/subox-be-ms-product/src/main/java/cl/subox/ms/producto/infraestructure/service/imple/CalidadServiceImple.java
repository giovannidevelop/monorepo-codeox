package cl.subox.ms.producto.infraestructure.service.imple;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cl.subox.ms.producto.domain.entities.entity.Calidad;
import cl.subox.ms.producto.infraestructure.repository.CalidadRepository;
import cl.subox.ms.producto.infraestructure.service.CalidadService;

@Service
public class CalidadServiceImple implements CalidadService {

    @Autowired
    private CalidadRepository calidadRepository;

       @Override
    public List<Calidad> listarTodas() {
        return calidadRepository.findAll();
    }
   @Override
    public Calidad guardar(Calidad calidad) {
        return calidadRepository.save(calidad);
    }
}
