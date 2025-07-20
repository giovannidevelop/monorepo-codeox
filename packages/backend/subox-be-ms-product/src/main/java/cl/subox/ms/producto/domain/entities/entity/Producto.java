package cl.subox.ms.producto.domain.entities.entity;

import java.math.BigDecimal;
import java.time.LocalDate;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Entity
@Data
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String nombre;
    private String descripcion;

    private BigDecimal precioCompra;
    private BigDecimal precioVenta;

    private int stock;
    private LocalDate fechaIngreso;

    @ManyToOne
    @JsonIgnoreProperties("productos") // Evita bucles si Categoria tiene List<Producto>
    private Categoria categoria;

    @ManyToOne
    @JsonIgnoreProperties("productos") // Aplica si Marca tiene List<Producto>
    private Marca marca;

    @ManyToOne
    @JoinColumn(name = "calidad_id")
    @JsonIgnoreProperties("productos") // Aplica si Calidad tiene List<Producto>
    private Calidad calidad;

    @ManyToOne
    @JoinColumn(name = "estado_producto_id")
    @JsonIgnoreProperties("productos") // Aplica si EstadoProducto tiene List<Producto>
    private EstadoProducto estadoProducto;
}
