package com.subox.inventario.cliente_service.adapter.out.persistence.entity.ubicacion;

import com.subox.inventario.cliente_service.domain.model.ubicacion.Comuna;
import jakarta.persistence.*;
import lombok.*;
@Entity
@Table(name = "comuna")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ComunaEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    @ManyToOne
    @JoinColumn(name = "provincia_id")
    private ProvinciaEntity provincia;

    public Comuna toDomain() {
        return new Comuna(id, nombre, provincia.toDomain());
    }

    public static ComunaEntity fromDomain(Comuna comuna) {
        if (comuna == null) return null;
        return new ComunaEntity(
            comuna.getId(),
            comuna.getNombre(),
            ProvinciaEntity.fromDomain(comuna.getProvincia())
        );
    }
}
