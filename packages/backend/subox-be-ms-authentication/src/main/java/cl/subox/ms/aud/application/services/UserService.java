package cl.subox.ms.aud.application.services;

import java.util.Optional;
import java.util.Set;

import cl.subox.ms.aud.application.usecases.UserUseCaseImpl;
import cl.subox.ms.aud.domain.model.entities.UserModel;
import cl.subox.ms.aud.domain.ports.in.UserUseCase;
import lombok.Data;

@Data
public class UserService implements UserUseCase {

    private final UserUseCaseImpl userUseCase;

    @Override
    public UserModel registrarUsuario(String username, String password, String correo, Set<String> roles) {
        try {
            return userUseCase.registrarUsuario(username, password, correo, roles);
        } catch (Exception e) {
            throw new RuntimeException("Error al registrar el usuario: " + e.getMessage());
        }
    }
    

    @Override
    public String iniciarSesion(String username, String password) {
        return userUseCase.iniciarSesion(username, password);
    }

    @Override
    public UserModel actualizarPerfil(Long userId, UserModel nuevoUsuario) {
        return userUseCase.actualizarPerfil(userId, nuevoUsuario);
    }

    @Override
    public void recuperarContraseña(String usernameOrEmail) {
        userUseCase.recuperarContraseña(usernameOrEmail);
    }


    @Override
    public Optional<UserModel> obtenerUsuarioPorUsernameOrEmail(String username) {
        return userUseCase.obtenerUsuarioPorUsernameOrEmail(username);
    }

}
