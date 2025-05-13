package com.subox.inventario.cliente_service.adapter.in.web.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClienteResponse {
    private Long id;
    private String nombre;
    private String rut;
    private String telefono;
    private String email;
    private String direccion;
}

