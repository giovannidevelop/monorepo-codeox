package com.subox.inventario.cliente_service.adapter.in.web.dto;


import lombok.Data;

@Data
public class ClienteRequest {
    private String nombre;
    private String rut;
    private String telefono;
    private String email;
    private String direccion;
}
