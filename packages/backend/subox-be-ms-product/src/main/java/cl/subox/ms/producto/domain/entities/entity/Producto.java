package cl.subox.ms.producto.domain.entities.entity;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import lombok.Data;

@Entity
@Data
public class Producto {
    @Id
    private String id;

    private String nombre;
    private String descripcion;
    private double precioCompra;
    private double precioVenta;
    private int stock;
    private LocalDate fechaIngreso;

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
