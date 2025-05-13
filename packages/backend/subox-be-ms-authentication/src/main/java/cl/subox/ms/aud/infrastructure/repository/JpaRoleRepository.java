package cl.subox.ms.aud.infrastructure.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import cl.subox.ms.aud.domain.model.enums.ERole;
import cl.subox.ms.aud.infrastructure.entities.RoleEntity;

@Repository
public interface JpaRoleRepository extends JpaRepository<RoleEntity, Long> {
  Optional<RoleEntity> findByName(ERole name);
}