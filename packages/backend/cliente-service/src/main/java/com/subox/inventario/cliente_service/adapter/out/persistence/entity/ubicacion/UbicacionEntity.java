package com.subox.inventario.cliente_service.adapter.out.persistence.entity.ubicacion;



import com.subox.inventario.cliente_service.domain.model.ubicacion.Ubicacion;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "ubicacion")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UbicacionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String calle;
    private String numero;
    private String complemento;
    private String referencia;
    private String codigoPostal;

    private Double latitude;
    private Double longitude;

    private boolean validada;
    private String direccionCompleta;

    @ManyToOne
    @JoinColumn(name = "comuna_id")
    private ComunaEntity comuna;

    public Ubicacion toDomain() {
        return new Ubicacion(
            id, calle, numero, complemento, referencia, codigoPostal,
            comuna.toDomain(), latitude, longitude, validada, direccionCompleta
        );
    }

    public static UbicacionEntity fromDomain(Ubicacion ubicacion) {
        UbicacionEntity entity = new UbicacionEntity();
        entity.setId(ubicacion.getId());
        entity.setCalle(ubicacion.getCalle());
        entity.setNumero(ubicacion.getNumero());
        entity.setComplemento(ubicacion.getComplemento());
        entity.setReferencia(ubicacion.getReferencia());
        entity.setCodigoPostal(ubicacion.getCodigoPostal());
        entity.setLatitude(ubicacion.getLatitude());
        entity.setLongitude(ubicacion.getLongitude());
        entity.setValidada(ubicacion.isValidada());
        entity.setDireccionCompleta(ubicacion.getDireccionCompleta());
        entity.setComuna(ComunaEntity.fromDomain(ubicacion.getComuna()));
        return entity;
    }
}
