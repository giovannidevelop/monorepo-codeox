package cl.subox.ms.aud.domain.ports.out;

import java.util.Optional;

import cl.subox.ms.aud.domain.model.entities.RoleModel;
import cl.subox.ms.aud.domain.model.enums.ERole;

public interface  RoleRepositoryPort {
    Optional<RoleModel> findByName(ERole name);
}