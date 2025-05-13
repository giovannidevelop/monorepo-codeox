package cl.subox.ms.aud.infrastructure.repository;


import java.util.Optional;

import org.springframework.stereotype.Component;

import cl.subox.ms.aud.domain.model.entities.RoleModel;
import cl.subox.ms.aud.domain.model.enums.ERole;
import cl.subox.ms.aud.domain.ports.out.RoleRepositoryPort;
import cl.subox.ms.aud.infrastructure.entities.RoleEntity;
import lombok.Data;

@Data
@Component
public class JpaRoleRepositoryAdapter implements RoleRepositoryPort{
  
    private final JpaRoleRepository jpaRoleRepository;

    @Override
    public Optional<RoleModel> findByName(ERole name) {
        Optional<RoleEntity> entityOptional =  jpaRoleRepository.findByName(name);
        return entityOptional.map(userEntity -> userEntity.toRoleModel());
    }

    


}
