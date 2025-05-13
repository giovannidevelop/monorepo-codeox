package cl.subox.ms.producto.domain.entities.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "subCategoria")
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class SubCategoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private String description;
    private boolean habilitado;

    @ManyToOne
    @JoinColumn(name = "categoria_id")
    private Categoria categoria;

}
