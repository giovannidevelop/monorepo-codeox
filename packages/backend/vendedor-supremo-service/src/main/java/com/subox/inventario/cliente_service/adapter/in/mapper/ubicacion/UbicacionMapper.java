package com.subox.inventario.cliente_service.adapter.in.mapper.ubicacion;

import org.springframework.stereotype.Component;

import com.subox.inventario.cliente_service.adapter.in.dto.ubicacion.UbicacionRequest;
import com.subox.inventario.cliente_service.adapter.in.dto.ubicacion.UbicacionResponse;
import com.subox.inventario.cliente_service.domain.model.ubicacion.Comuna;
import com.subox.inventario.cliente_service.domain.model.ubicacion.Ubicacion;

@Component
public class UbicacionMapper {

    public Ubicacion toModel(UbicacionRequest request) {
        Ubicacion ubicacion = new Ubicacion();
        ubicacion.setCalle(request.calle);
        ubicacion.setNumero(request.numero);
        ubicacion.setComplemento(request.complemento);
        ubicacion.setReferencia(request.referencia);
        ubicacion.setCodigoPostal(request.codigoPostal);
        ubicacion.setLatitude(request.latitude);
        ubicacion.setLongitude(request.longitude);
        // Comuna debería venir desde un servicio o repositorio
        ubicacion.setComuna(new Comuna(request.comunaId, null, null));
        return ubicacion;
    }

    public Ubicacion toModel(Long id, UbicacionRequest request) {
        Ubicacion ubicacion = toModel(request);
        ubicacion.setId(id);
        return ubicacion;
    }

    public UbicacionResponse toResponse(Ubicacion ubicacion) {
        UbicacionResponse response = new UbicacionResponse();
        response.id = ubicacion.getId();
        response.calle = ubicacion.getCalle();
        response.numero = ubicacion.getNumero();
        response.complemento = ubicacion.getComplemento();
        response.referencia = ubicacion.getReferencia();
        response.codigoPostal = ubicacion.getCodigoPostal();
        response.latitude = ubicacion.getLatitude();
        response.longitude = ubicacion.getLongitude();
        response.validada = ubicacion.isValidada();
        if (ubicacion.getComuna() != null) {
            response.comunaId = ubicacion.getComuna().getId();
            response.comunaNombre = ubicacion.getComuna().getNombre();
            if (ubicacion.getComuna().getProvincia() != null) {
                response.provinciaNombre = ubicacion.getComuna().getProvincia().getNombre();
                if (ubicacion.getComuna().getProvincia().getRegion() != null) {
                    response.regionNombre = ubicacion.getComuna().getProvincia().getRegion().getNombre();
                }
            }
        }
        return response;
    }
}
