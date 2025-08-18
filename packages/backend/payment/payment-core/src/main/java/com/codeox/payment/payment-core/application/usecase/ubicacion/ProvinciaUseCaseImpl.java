package cl.codeox.payment.payment_core.application.usecase.ubicacion;


import java.util.List;

import org.springframework.stereotype.Service;

import cl.codeox.payment.payment_core.domain.model.ubicacion.Provincia;
import cl.codeox.payment.payment_core.port.in.ubicacion.ProvinciaUseCase;
import cl.codeox.payment.payment_core.port.out.ubicacion.ProvinciaRepositoryPort;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProvinciaUseCaseImpl implements ProvinciaUseCase {

     private final ProvinciaRepositoryPort repository;
  
    @Override
    public List<Provincia> findByRegionId(Long regionId) {
       return repository.findByRegionId(regionId);
    }
}
