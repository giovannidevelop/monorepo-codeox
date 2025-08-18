package cl.codeox.payment.payment_core.adapter.out.persistence.repository;

import cl.codeox.payment.payment_core.adapter.out.persistence.entity.ubicacion.ProvinciaEntity;
import cl.codeox.payment.payment_core.adapter.out.persistence.jpa.ProvinciaRepository;
import cl.codeox.payment.payment_core.domain.model.ubicacion.Provincia;
import cl.codeox.payment.payment_core.port.out.ubicacion.ProvinciaRepositoryPort;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;


import java.util.List;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class ProvinciaRepositoryAdapter implements ProvinciaRepositoryPort {

    private final ProvinciaRepository provinciaRepository;

    @Override
    public List<Provincia> findByRegionId(Long regionId) {
        return provinciaRepository.findByRegionId(regionId).stream()
                .map(ProvinciaEntity::toDomain)
                .collect(Collectors.toList());
    }

  
}
