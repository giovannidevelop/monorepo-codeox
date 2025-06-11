package com.subox.inventario.producto_service.adapter.in.web.dto;


import java.time.LocalDate;

import lombok.Data;

@Data
public class ProductoRequest {
     private String codigoBarras;
    private String nombre;
    private String descripcion;
    private double precioCompra;
    private double precioVenta;
    private int stock;
    private LocalDate fechaIngreso;
}
