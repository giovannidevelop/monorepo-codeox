package com.subox.inventario.cliente_service.adapter.out.persistence.repository;

import com.subox.inventario.cliente_service.adapter.out.persistence.entity.ubicacion.UbicacionEntity;
import com.subox.inventario.cliente_service.adapter.out.persistence.jpa.UbicacionRepository;
import com.subox.inventario.cliente_service.domain.model.ubicacion.Ubicacion;
import com.subox.inventario.cliente_service.port.out.ubicacion.UbicacionRepositoryPort;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class UbicacionRepositoryAdapter implements UbicacionRepositoryPort {

    private final UbicacionRepository ubicacionRepository;

    @Override
    public Ubicacion guardar(Ubicacion ubicacion) {
        UbicacionEntity entity = UbicacionEntity.fromDomain(ubicacion);
        return ubicacionRepository.save(entity).toDomain();
    }

    @Override
    public Optional<Ubicacion> buscarPorId(Long id) {
        return ubicacionRepository.findById(id).map(UbicacionEntity::toDomain);
    }

    @Override
    public List<Ubicacion> buscarPorComunaId(Long comunaId) {
        return ubicacionRepository.findByComunaId(comunaId)
                .stream()
                .map(UbicacionEntity::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public List<Ubicacion> buscarPorCalleYNumero(String calle, String numero) {
        return ubicacionRepository.findByCalleAndNumero(calle, numero)
                .stream()
                .map(UbicacionEntity::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public List<Ubicacion> buscarTodas() {
        return ubicacionRepository.findAll()
                .stream()
                .map(UbicacionEntity::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public void eliminarPorId(Long id) {
        ubicacionRepository.deleteById(id);
    }

    @Override
    public boolean existeUbicacionValidada(String direccionCompleta) {
        return ubicacionRepository.existsByDireccionCompleta(direccionCompleta);
    }
}
