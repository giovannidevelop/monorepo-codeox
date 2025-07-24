package com.subox.inventario.cliente_service.domain.model.ubicacion;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Comuna {
    private Long id;
    private String nombre;
    private Provincia provincia;  // Asociación con Provincia
}
