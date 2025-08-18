package cl.codeox.payment.payment_core.port.in.ubicacion;

import java.util.List;

import cl.codeox.payment.payment_core.domain.model.ubicacion.Comuna;

public interface ComunaUseCase {
      List<Comuna> listarPorProvinciaId(Long provinciaId);
}
