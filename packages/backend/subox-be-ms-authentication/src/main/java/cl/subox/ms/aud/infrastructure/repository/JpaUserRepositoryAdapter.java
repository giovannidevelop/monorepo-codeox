package cl.subox.ms.aud.infrastructure.repository;


import java.util.Optional;

import org.springframework.stereotype.Component;

import cl.subox.ms.aud.domain.model.entities.UserModel;
import cl.subox.ms.aud.domain.ports.out.UserRepositoryPort;
import cl.subox.ms.aud.infrastructure.entities.UserEntity;
import lombok.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Data
@Component
public class JpaUserRepositoryAdapter implements UserRepositoryPort{
    private static final Logger logger = LoggerFactory.getLogger(JpaUserRepositoryAdapter.class);

    private final JpaUserRepository jpaUserRepository;

    @Override
    public UserModel save(UserModel usuario) {
        logger.info("Repository de usuario > {}", usuario);
        UserEntity entity = UserEntity.fromUserModel(usuario);
        UserEntity saved = jpaUserRepository.save(entity);
        logger.info("saved > {}", saved);
        return saved.toUserModel();
    }
    

    @Override
    public Optional<UserModel> findById(Long id) {
        Optional<UserEntity> entity =  jpaUserRepository.findById(id);
        UserEntity userEntity = entity.get();
       return Optional.ofNullable(userEntity.toUserModel());
    }


    @Override
    public void delete(UserModel usuario) {
        Optional<UserEntity> entity =  jpaUserRepository.findByUsername(usuario.getUsername());
        UserEntity userEntity = entity.get();
        jpaUserRepository.delete(userEntity);
    }


    @Override
    public Optional<UserModel> findByUsername(String username) {
        Optional<UserEntity> entityOptional =  jpaUserRepository.findByUsername(username);
        return entityOptional.map(userEntity -> userEntity.toUserModel());
    }


    @Override
    public Optional<UserModel> findByEmail(String email) {
        Optional<UserEntity> entityOptional = jpaUserRepository.findByEmail(email);
        return entityOptional.map(UserEntity::toUserModel);
    }
    @Override
    public Optional<UserModel> findByUsernameOrEmail(String username, String email) {
        // Buscar primero por nombre de usuario
        Optional<UserModel> userByUsername = jpaUserRepository.findByUsername(username)
                .map(UserEntity::toUserModel);
    
        // Si no se encontró por nombre de usuario, buscar por correo electrónico
        if (userByUsername.isPresent()) {
            return userByUsername;
        } else {
            return findByEmail(email); // Llama al método ya implementado
        }
    }
    


}
