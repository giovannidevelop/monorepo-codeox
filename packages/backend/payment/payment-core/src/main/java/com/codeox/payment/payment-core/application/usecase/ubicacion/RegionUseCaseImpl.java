package cl.codeox.payment.payment_core.application.usecase.ubicacion;

import java.util.List;

import org.springframework.stereotype.Service;

import cl.codeox.payment.payment_core.domain.model.ubicacion.Region;
import cl.codeox.payment.payment_core.port.in.ubicacion.RegionUseCase;
import cl.codeox.payment.payment_core.port.out.ubicacion.RegionRepositoryPort;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RegionUseCaseImpl implements RegionUseCase {

    private final RegionRepositoryPort repository;

    @Override
    public List<Region> findAll() {
        return repository.findAll();
    }
}
