package cl.codeox.payment.payment_core.port.out.ubicacion;

import java.util.List;

import cl.codeox.payment.payment_core.domain.model.ubicacion.Provincia;

public interface ProvinciaRepositoryPort  {
    List<Provincia> findByRegionId(Long regionId);
}
