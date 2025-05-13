package cl.subox.ms.producto.infraestructure.service;


import cl.subox.ms.producto.domain.entities.entity.Categoria;
import cl.subox.ms.producto.infraestructure.repository.CategoriaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

import cl.subox.ms.producto.domain.entities.entity.Prenda;
import cl.subox.ms.producto.domain.enums.EstadoVenta;
import cl.subox.ms.producto.infraestructure.repository.PrendaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PrendaService {

    private final PrendaRepository prendaRepository;

    public List<Prenda> listarPrendas() {
        return prendaRepository.findAll();
    }

    public Optional<Prenda> obtenerPrendaPorId(Long id) {
        return prendaRepository.findById(id);
    }

    public Prenda crearPrenda(Prenda prenda) {
        return prendaRepository.save(prenda);
    }

    public Prenda actualizarPrenda(Long id, Prenda prendaActualizada) {
        return prendaRepository.findById(id)
            .map(prenda -> {
                prenda.setNombre(prendaActualizada.getNombre());
                prenda.setDescripcion(prendaActualizada.getDescripcion());
                prenda.setPrecio(prendaActualizada.getPrecio());
                prenda.setEstadoVenta(prendaActualizada.getEstadoVenta());
                return prendaRepository.save(prenda);
            })
            .orElseThrow(() -> new RuntimeException("Prenda no encontrada"));
    }

    public void eliminarPrenda(Long id) {
        prendaRepository.deleteById(id);
    }

    public List<Prenda> listarPrendasPorEstado(EstadoVenta estado) {
        return prendaRepository.findAll().stream()
            .filter(prenda -> prenda.getEstadoVenta().equals(estado))
            .toList();
    }
}