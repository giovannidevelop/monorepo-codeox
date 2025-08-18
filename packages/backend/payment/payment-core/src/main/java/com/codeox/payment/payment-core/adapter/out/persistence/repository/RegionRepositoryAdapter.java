package cl.codeox.payment.payment_core.adapter.out.persistence.repository;

import cl.codeox.payment.payment_core.adapter.out.persistence.entity.ubicacion.RegionEntity;
import cl.codeox.payment.payment_core.adapter.out.persistence.jpa.RegionRepository;
import cl.codeox.payment.payment_core.port.out.ubicacion.RegionRepositoryPort;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class RegionRepositoryAdapter implements RegionRepositoryPort {

    private final RegionRepository regionRepository;

    @Override
    public List<cl.codeox.payment.payment_core.domain.model.ubicacion.Region> findAll() {
        return regionRepository.findAll().stream()
                .map(RegionEntity::toDomain)
                .collect(Collectors.toList());
    }

}
