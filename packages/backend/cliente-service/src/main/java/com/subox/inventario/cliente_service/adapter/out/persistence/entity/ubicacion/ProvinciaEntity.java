package com.subox.inventario.cliente_service.adapter.out.persistence.entity.ubicacion;

import com.subox.inventario.cliente_service.domain.model.ubicacion.Provincia;
import jakarta.persistence.*;
import lombok.*;
@Entity
@Table(name = "provincia")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProvinciaEntity {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    @ManyToOne
    @JoinColumn(name = "region_id")
    private RegionEntity region;

    public Provincia toDomain() {
        return new Provincia(id, nombre, region.toDomain());
    }

    public static ProvinciaEntity fromDomain(Provincia provincia) {
        if (provincia == null) return null;
        return new ProvinciaEntity(
            provincia.getId(),
            provincia.getNombre(),
            RegionEntity.fromDomain(provincia.getRegion())
        );
    }
}

