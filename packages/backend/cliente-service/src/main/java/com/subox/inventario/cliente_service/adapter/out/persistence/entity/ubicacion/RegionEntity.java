package com.subox.inventario.cliente_service.adapter.out.persistence.entity.ubicacion;

import com.subox.inventario.cliente_service.domain.model.ubicacion.Region;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "region")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    // Conversión a modelo de dominio
    public Region toDomain() {
        return new Region(this.id, this.nombre);
    }

    // Conversión desde modelo de dominio
    public static RegionEntity fromDomain(Region region) {
        if (region == null) return null;
        return new RegionEntity(region.getId(), region.getNombre());
    }
}
