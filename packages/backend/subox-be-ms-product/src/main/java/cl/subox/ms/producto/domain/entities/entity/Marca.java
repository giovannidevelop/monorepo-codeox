package cl.subox.ms.producto.domain.entities.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Marca {
    @Id @GeneratedValue
    private Long id;
    private String nombre;
}
