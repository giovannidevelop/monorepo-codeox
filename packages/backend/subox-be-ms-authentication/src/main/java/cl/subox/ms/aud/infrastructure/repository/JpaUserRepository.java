package cl.subox.ms.aud.infrastructure.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import cl.subox.ms.aud.infrastructure.entities.UserEntity;

@Repository
public interface JpaUserRepository extends JpaRepository<UserEntity, Long>{
   Optional<UserEntity> findByUsername(String user);
   Optional<UserEntity> findByEmail(String email);
}
