package com.subox.inventario.cliente_service.application.usecase.ubicacion;

import com.subox.inventario.cliente_service.application.services.ubicacion.UbicacionValidador;
import com.subox.inventario.cliente_service.domain.model.ubicacion.Ubicacion;
import com.subox.inventario.cliente_service.port.in.ubicacion.UbicacionUseCase;
import com.subox.inventario.cliente_service.port.out.ubicacion.UbicacionRepositoryPort;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
@Service
@RequiredArgsConstructor
public class UbicacionUseCaseImpl implements UbicacionUseCase {

    private final UbicacionRepositoryPort repository;
    private final UbicacionValidador validador; 

    @Override
    public Ubicacion crear(Ubicacion ubicacion) {
        Ubicacion validada = validador.validar(ubicacion);
        if (repository.existeUbicacionValidada(validada.getDireccionCompleta())) {
            throw new IllegalArgumentException("Ubicación ya existe.");
        }
        return repository.guardar(validada);
    }

    @Override
    public Ubicacion actualizar(Long id, Ubicacion ubicacion) {
        if (!repository.buscarPorId(id).isPresent()) {
            throw new IllegalArgumentException("Ubicación no encontrada.");
        }
        ubicacion.setId(id);
        Ubicacion validada = validador.validar(ubicacion);
        return repository.guardar(validada);
    }

    @Override
    public void eliminar(Long id) {
        repository.eliminarPorId(id);
    }

    @Override
    public List<Ubicacion> findAll() {
        return repository.buscarTodas();
    }

    @Override
    public Optional<Ubicacion> buscarPorId(Long id) {
        return repository.buscarPorId(id);
    }

    @Override
    public List<Ubicacion> buscarPorComunaId(Long comunaId) {
        return repository.buscarPorComunaId(comunaId);
    }

    @Override
    public List<Ubicacion> buscarPorCalleYNumero(String calle, String numero) {
        return repository.buscarPorCalleYNumero(calle, numero);
    }

    @Override
    public boolean existeDireccionNormalizada(String direccionCompleta) {
        return repository.existeUbicacionValidada(direccionCompleta);
    }

    @Override
    public Ubicacion validarUbicacion(Ubicacion ubicacion) {
        return validador.validar(ubicacion);
    }

    @Override
    public List<Ubicacion> buscarPorCoordenadas(Double latitud, Double longitud, double radioEnMetros) {
        // puedes implementar un cálculo geoespacial aquí si tu repositorio lo soporta
        throw new UnsupportedOperationException("Consulta geoespacial aún no implementada.");
    }
}
