package cl.subox.ms.aud.domain.ports.out;


import java.util.Optional;


import cl.subox.ms.aud.domain.model.entities.UserModel;

public interface UserRepositoryPort {
    UserModel save(UserModel usuario);
    Optional<UserModel> findById(Long id);
    Optional<UserModel> findByUsername(String username);
    Optional<UserModel> findByEmail(String email);
    Optional<UserModel> findByUsernameOrEmail(String username, String email);
    void delete(UserModel usuario);
}
