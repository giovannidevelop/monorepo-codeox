package cl.codeox.payment.payment_core.application.usecase.ubicacion;

import java.util.List;

import org.springframework.stereotype.Service;

import cl.codeox.payment.payment_core.domain.model.ubicacion.Comuna;
import cl.codeox.payment.payment_core.port.in.ubicacion.ComunaUseCase;
import cl.codeox.payment.payment_core.port.out.ubicacion.ComunaRepositoryPort;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ComunaUseCaseImpl implements ComunaUseCase{

    private final ComunaRepositoryPort repository;

      @Override
      public List<Comuna> listarPorProvinciaId(Long provinciaId) {
            return repository.listarPorProvinciaId(provinciaId);
      }
}
