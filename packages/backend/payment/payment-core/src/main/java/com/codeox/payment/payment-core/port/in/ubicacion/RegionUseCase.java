package cl.codeox.payment.payment_core.port.in.ubicacion;

import java.util.List;

import cl.codeox.payment.payment_core.domain.model.ubicacion.Region;

public interface RegionUseCase {
    List<Region> findAll();
}
