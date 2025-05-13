package cl.subox.ms.aud.domain.ports.in;

import java.util.Optional;
import java.util.Set;


import cl.subox.ms.aud.domain.model.entities.UserModel;

public interface UserUseCase {
    UserModel registrarUsuario(String username, String password, String correo, Set<String> role);
    String iniciarSesion(String username, String password);
    UserModel actualizarPerfil(Long userId, UserModel nuevoUsuario);
    void recuperarContraseña(String usernameOrEmail);
    Optional<UserModel> obtenerUsuarioPorUsernameOrEmail(String usernameOrEmail);
}
