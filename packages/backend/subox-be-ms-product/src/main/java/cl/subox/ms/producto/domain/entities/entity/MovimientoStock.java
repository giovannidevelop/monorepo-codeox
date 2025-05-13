package cl.subox.ms.producto.domain.entities.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import cl.subox.ms.producto.domain.enums.TipoMovimiento;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MovimientoStock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "prenda_id")
    private Prenda prenda;

    @Enumerated(EnumType.STRING)
    private TipoMovimiento tipo;

    private Date fecha;

    @ManyToOne
    @JoinColumn(name = "ubicacion_origen_id", nullable = true)
    private Ubicacion ubicacionOrigen;

    @ManyToOne
    @JoinColumn(name = "ubicacion_destino_id", nullable = true)
    private Ubicacion ubicacionDestino;

    private int cantidad;
}

