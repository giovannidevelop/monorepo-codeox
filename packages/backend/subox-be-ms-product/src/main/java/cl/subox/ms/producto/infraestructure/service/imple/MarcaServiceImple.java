package cl.subox.ms.producto.infraestructure.service.imple;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cl.subox.ms.producto.domain.entities.entity.Marca;
import cl.subox.ms.producto.infraestructure.repository.MarcaRepository;
import cl.subox.ms.producto.infraestructure.service.MarcaService;

@Service
public class MarcaServiceImple implements MarcaService {

    @Autowired
    private MarcaRepository marcaRepository;

    @Override
    public List<Marca> listarTodas() {
        return marcaRepository.findAll();
    }

    @Override
    public Marca guardar(Marca Marca) {
        return marcaRepository.save(Marca);
    }
}
