package com.subox.inventario.cliente_service.domain.model.ubicacion;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Ubicacion {
    private Long id;
    private String calle;
    private String numero;
    private String complemento;   // depto, block, piso, etc. (más genérico)
    private String referencia;    // referencia para la ubicación exacta
    private String codigoPostal;  // validado contra comuna
    private Comuna comuna;        // referencia jerárquica obligatoria

    private Double latitude;      // latitud exacta (geocodificación)
    private Double longitude;     // longitud exacta (geocodificación)

    private boolean validada;     // marca si la dirección fue validada por API externa

    private String direccionCompleta; // dirección normalizada y estandarizada, guardada tras validación
}
