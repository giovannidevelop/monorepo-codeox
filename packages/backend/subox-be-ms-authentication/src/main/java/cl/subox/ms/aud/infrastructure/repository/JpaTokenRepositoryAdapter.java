package cl.subox.ms.aud.infrastructure.repository;


import java.util.Optional;

import org.springframework.stereotype.Component;

import cl.subox.ms.aud.domain.ports.out.TokenRepositoryPort;
import cl.subox.ms.aud.infrastructure.entities.TokenEntity;
import lombok.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Data
@Component
public class JpaTokenRepositoryAdapter implements TokenRepositoryPort{
    private static final Logger logger = LoggerFactory.getLogger(JpaUserRepositoryAdapter.class);

    private final JpaTokenRepository jpaTokenRepository;

    @Override
    public TokenEntity save(TokenEntity token) {
        logger.info("Guardando token en la base de datos: {}", token);
        return jpaTokenRepository.save(token);
    }

    @Override
    public Optional<TokenEntity> findByToken(String token) {
        logger.info("Buscando token: {}", token);
        return jpaTokenRepository.findByToken(token);
    }

    @Override
    public void delete(TokenEntity token) {
        logger.info("Eliminando token: {}", token);
        jpaTokenRepository.delete(token);
    }

    @Override
    public Optional<TokenEntity> findByUserId(Long userId) {
        logger.info("Buscando token por ID de usuario: {}", userId);
        return jpaTokenRepository.findByUserId(userId);
    }
}
