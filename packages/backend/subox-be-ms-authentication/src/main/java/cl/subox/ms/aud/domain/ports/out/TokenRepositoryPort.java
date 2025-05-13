package cl.subox.ms.aud.domain.ports.out;


import java.util.Optional;

import cl.subox.ms.aud.infrastructure.entities.TokenEntity;

public interface TokenRepositoryPort {

    TokenEntity save(TokenEntity token);

    Optional<TokenEntity> findByToken(String token);

    void delete(TokenEntity token);

    // Puedes agregar otros métodos si lo necesitas, como buscar por usuario
    Optional<TokenEntity> findByUserId(Long userId);
}
