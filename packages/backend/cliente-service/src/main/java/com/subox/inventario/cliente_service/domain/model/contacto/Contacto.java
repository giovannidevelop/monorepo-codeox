package com.subox.inventario.cliente_service.domain.model.contacto;

import com.subox.inventario.cliente_service.domain.model.ubicacion.Ubicacion;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Contacto {
    private Long id;
    private Telefono telefono;
    private Email email;
    private Ubicacion ubicacion;
}
