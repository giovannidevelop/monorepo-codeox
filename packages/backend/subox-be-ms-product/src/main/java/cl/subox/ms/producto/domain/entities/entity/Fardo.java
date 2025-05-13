package cl.subox.ms.producto.domain.entities.entity;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import cl.subox.ms.producto.domain.enums.CategoriaFardo;
import cl.subox.ms.producto.domain.enums.EstadoFardo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Fardo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private String descripcion;
    private Date fechaCompra;
    private BigDecimal costoTotal;
    
    @ManyToOne
    @JoinColumn(name = "ubicacion_id")
    private Ubicacion ubicacion;
    
    @Enumerated(EnumType.STRING)
    private EstadoFardo estado;


    @Enumerated(EnumType.STRING)
    private CategoriaFardo categoria;
}


