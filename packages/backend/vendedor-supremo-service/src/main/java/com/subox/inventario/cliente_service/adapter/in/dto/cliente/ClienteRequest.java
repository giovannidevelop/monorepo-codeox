package com.subox.inventario.cliente_service.adapter.in.dto.cliente;


import lombok.Data;

@Data
public class ClienteRequest {
    private String nombre;
    private String rut;
    private String telefono;
    private String email;
    private String direccion;
}
