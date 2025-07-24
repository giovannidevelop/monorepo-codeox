package com.subox.inventario.cliente_service.application.services.ubicacion;

import org.springframework.stereotype.Service;

import com.subox.inventario.cliente_service.domain.model.ubicacion.Ubicacion;

@Service
public class UbicacionValidador {

    public Ubicacion validar(Ubicacion ubicacion) {
        // Aquí iría el llamado real a la API de Google Maps (omito la conexión real)
        // Supongamos que usaste una API REST y obtuviste lat/lng y dirección formateada

        ubicacion.setLatitude(-33.456); // simulado
        ubicacion.setLongitude(-70.648); // simulado
        ubicacion.setDireccionCompleta("Simón Bolívar 1234, Ñuñoa, Región Metropolitana");
        ubicacion.setValidada(true);
        return ubicacion;
    }
}
