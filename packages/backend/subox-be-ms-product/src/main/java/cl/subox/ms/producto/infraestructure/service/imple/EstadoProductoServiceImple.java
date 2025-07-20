package cl.subox.ms.producto.infraestructure.service.imple;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import cl.subox.ms.producto.domain.entities.entity.EstadoProducto;
import cl.subox.ms.producto.infraestructure.repository.EstadoProductoRepository;
import cl.subox.ms.producto.infraestructure.service.EstadoProductoService;

@Service
public class EstadoProductoServiceImple implements EstadoProductoService {

    @Autowired
    private EstadoProductoRepository estadoProductoRepository;

    @Override
    public List<EstadoProducto> listarTodas() {
        return estadoProductoRepository.findAll();
    }

    @Override
    public EstadoProducto guardar(EstadoProducto EstadoProducto) {
        return estadoProductoRepository.save(EstadoProducto);
    }
}
