package cl.subox.ms.producto.domain.entities.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class EstadoProducto {
    @Id @GeneratedValue
    private Long id;
    private String estado; // Ej: "Nuevo", "Usado", "Dañado"
}
