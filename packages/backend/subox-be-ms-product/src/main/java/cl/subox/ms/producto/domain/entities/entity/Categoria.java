package cl.subox.ms.producto.domain.entities.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.Data;

@Entity
@Data
public class Categoria {
    @Id @GeneratedValue
    private Long id;
    private String nombre;
    private String descripcion;
}