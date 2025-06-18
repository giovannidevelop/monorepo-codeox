package com.subox.inventario.cliente_service.domain.model.actores;

import com.subox.inventario.cliente_service.domain.model.persona.Persona;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Cliente extends Persona {
    private String tipoCliente;    
    private String formaPago;
}
