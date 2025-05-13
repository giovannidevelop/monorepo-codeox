package cl.subox.ms.aud.infrastructure;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import cl.subox.ms.aud.domain.model.enums.ERole;
import cl.subox.ms.aud.infrastructure.entities.RoleEntity;
import cl.subox.ms.aud.infrastructure.repository.JpaRoleRepository;

@Component
public class RoleInitializer implements CommandLineRunner {

    @Autowired
    JpaRoleRepository roleRepository;

    @Override
    public void run(String... args) throws Exception {
        // Verificar y crear ROLE_USER
        if (roleRepository.findByName(ERole.ROLE_USER).isEmpty()) {
            RoleEntity roleUser = new RoleEntity();
            roleUser.setName(ERole.ROLE_USER);
            roleRepository.save(roleUser);
        }
        
        // Verificar y crear PALADIN
        if (roleRepository.findByName(ERole.PALADIN).isEmpty()) {
            RoleEntity rolePaladin = new RoleEntity();
            rolePaladin.setName(ERole.PALADIN);
            roleRepository.save(rolePaladin);
        }

        // Verificar y crear ROLE_ADMIN
        if (roleRepository.findByName(ERole.ROLE_ADMIN).isEmpty()) {
            RoleEntity roleAdmin = new RoleEntity();
            roleAdmin.setName(ERole.ROLE_ADMIN);
            roleRepository.save(roleAdmin);
        }
    }
}
