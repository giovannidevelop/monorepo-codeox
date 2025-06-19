package com.subox.inventario.cliente_service.port.in.ubicacion;

import com.subox.inventario.cliente_service.domain.model.ubicacion.Ubicacion;

import java.util.List;
import java.util.Optional;

public interface UbicacionUseCase {

    Ubicacion crear(Ubicacion ubicacion);

    Ubicacion actualizar(Long id, Ubicacion ubicacion);

    void eliminar(Long id);

    List<Ubicacion> findAll();

    Optional<Ubicacion> buscarPorId(Long id);

    List<Ubicacion> buscarPorComunaId(Long comunaId);

    List<Ubicacion> buscarPorCalleYNumero(String calle, String numero);

    boolean existeDireccionNormalizada(String direccionCompleta);

    Ubicacion validarUbicacion(Ubicacion ubicacion); // por ejemplo, usando Google Maps API

    List<Ubicacion> buscarPorCoordenadas(Double latitud, Double longitud, double radioEnMetros);
}
