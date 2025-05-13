package cl.subox.ms.producto.infraestructure.service;


import cl.subox.ms.producto.domain.entities.entity.Categoria;
import cl.subox.ms.producto.infraestructure.repository.CategoriaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

import cl.subox.ms.producto.domain.entities.entity.Fardo;
import cl.subox.ms.producto.domain.enums.CategoriaFardo;
import cl.subox.ms.producto.infraestructure.repository.FardoRepository;

@Service
@RequiredArgsConstructor
public class FardoService {

    private final FardoRepository fardoRepository;

    public List<Fardo> listarFardos() {
        return fardoRepository.findAll();
    }

    public List<Fardo> listarFardosPorCategoria(CategoriaFardo categoria) {
        return fardoRepository.findByCategoria(categoria);
    }

    public Fardo crearFardo(Fardo fardo) {
        return fardoRepository.save(fardo);
    }
}
