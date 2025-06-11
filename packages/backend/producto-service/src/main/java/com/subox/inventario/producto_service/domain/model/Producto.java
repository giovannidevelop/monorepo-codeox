package com.subox.inventario.producto_service.domain.model;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Producto {
    private Long id;
    private String codigoBarras;
    private String nombre;
    private String descripcion;
    private double precioCompra;
    private double precioVenta;
    private int stock;
    private LocalDate fechaIngreso;
}

/**
 * 
 *    @Id
    private String id;



    @ManyToOne
    private Categoria categoria;

    @ManyToOne
    private Proveedor proveedor;

    @ManyToOne
    private Marca marca;

    @ManyToOne
    private EstadoProducto estado;

    @ManyToOne
    private Ubicacion ubicacion;
}
 */