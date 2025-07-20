package cl.subox.ms.producto.domain.entities.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "estado_producto")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EstadoProducto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String estado; // Ej: "Nuevo", "Usado", "Dañado"
}
