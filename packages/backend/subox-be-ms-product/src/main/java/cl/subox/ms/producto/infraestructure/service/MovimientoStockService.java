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


import cl.subox.ms.producto.domain.entities.entity.MovimientoStock;
import cl.subox.ms.producto.infraestructure.repository.MovimientoStockRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MovimientoStockService {

    private final MovimientoStockRepository movimientoStockRepository;

    public List<MovimientoStock> listarMovimientos() {
        return movimientoStockRepository.findAll();
    }

    public MovimientoStock registrarMovimiento(MovimientoStock movimiento) {
        return movimientoStockRepository.save(movimiento);
    }
}