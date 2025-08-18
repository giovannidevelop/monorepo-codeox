package cl.codeox.payment.payment_core.port.out.ubicacion;

import java.util.List;

import cl.codeox.payment.payment_core.domain.model.ubicacion.Comuna;

public interface ComunaRepositoryPort {
      List<Comuna> listarPorProvinciaId(Long provinciaId);
}
