package com.subox.inventario.cliente_service.domain.model.ubicacion;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Provincia {
    private Long id;
    private String nombre;
    private Region region;  // Asociación con Región
}
