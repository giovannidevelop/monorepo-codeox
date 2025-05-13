package cl.subox.ms.aud.application.usecases;

import cl.subox.ms.aud.domain.model.entities.UserModel;
import cl.subox.ms.aud.domain.ports.in.RoleUseCase;
import cl.subox.ms.aud.domain.ports.out.RoleRepositoryPort;
import cl.subox.ms.aud.domain.ports.out.UserRepositoryPort;
import lombok.Data;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Data
public class RoleUseCaseImpl implements RoleUseCase {
    private static final Logger logger = LoggerFactory.getLogger(RoleUseCaseImpl.class);

    private final UserRepositoryPort userRepositoryPort;
    private final RoleRepositoryPort roleRepositoryPort;
    @Override
    public UserModel asignarRolAUsuario(Long userId, Long roleId) {
        throw new UnsupportedOperationException("Unimplemented method 'asignarRolAUsuario'");
    }
    @Override
    public UserModel removerRolDeUsuario(Long userId, Long roleId) {
        throw new UnsupportedOperationException("Unimplemented method 'removerRolDeUsuario'");
    }
    @Override
    public boolean usuarioTieneRol(Long userId, Long roleId) {
        throw new UnsupportedOperationException("Unimplemented method 'usuarioTieneRol'");
    }
    @Override
    public List<UserModel> obtenerRolesDeUsuario(Long userId) {
        throw new UnsupportedOperationException("Unimplemented method 'obtenerRolesDeUsuario'");
    }
    @Override
    public List<UserModel> obtenerUsuariosPorRol(Long roleId) {
        throw new UnsupportedOperationException("Unimplemented method 'obtenerUsuariosPorRol'");
    }

  
}
