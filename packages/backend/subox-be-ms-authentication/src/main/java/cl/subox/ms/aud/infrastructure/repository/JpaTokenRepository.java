package cl.subox.ms.aud.infrastructure.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import cl.subox.ms.aud.infrastructure.entities.TokenEntity;

@Repository
public interface JpaTokenRepository extends JpaRepository<TokenEntity, Long>{
   Optional<TokenEntity> findByToken(String token);
   Optional<TokenEntity> findByUserId(Long userId);
}
