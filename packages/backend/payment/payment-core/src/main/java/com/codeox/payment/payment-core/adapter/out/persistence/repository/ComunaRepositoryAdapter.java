package cl.codeox.payment.payment_core.adapter.out.persistence.repository;

import cl.codeox.payment.payment_core.adapter.out.persistence.entity.ubicacion.ComunaEntity;
import cl.codeox.payment.payment_core.adapter.out.persistence.jpa.ComunaRepository;
import cl.codeox.payment.payment_core.domain.model.ubicacion.Comuna;
import cl.codeox.payment.payment_core.port.out.ubicacion.ComunaRepositoryPort;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class ComunaRepositoryAdapter implements ComunaRepositoryPort {

    private final ComunaRepository comunaRepository;

    @Override
    public List<Comuna> listarPorProvinciaId(Long provinciaId) {
        return comunaRepository.findByProvinciaId(provinciaId)
                .stream()
                .map(ComunaEntity::toDomain) // asegúrate de tener este método en ComunaEntity
                .collect(Collectors.toList());
    }

}
