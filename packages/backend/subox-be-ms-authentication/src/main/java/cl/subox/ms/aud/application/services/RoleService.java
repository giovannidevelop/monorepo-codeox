package cl.subox.ms.aud.application.services;

import java.util.List;

import cl.subox.ms.aud.application.usecases.RoleUseCaseImpl;
import cl.subox.ms.aud.domain.model.entities.UserModel;
import cl.subox.ms.aud.domain.ports.in.RoleUseCase;
import lombok.Data;

@Data
public class RoleService implements RoleUseCase {

    private final RoleUseCaseImpl roleUseCase;

    @Override
    public UserModel asignarRolAUsuario(Long userId, Long roleId) {
        return roleUseCase.asignarRolAUsuario(userId, roleId);
    }

    @Override
    public UserModel removerRolDeUsuario(Long userId, Long roleId) {
        return roleUseCase.removerRolDeUsuario(userId, roleId);
    }

    @Override
    public boolean usuarioTieneRol(Long userId, Long roleId) {
        List<UserModel> rolesDeUsuario = obtenerRolesDeUsuario(userId);
        return rolesDeUsuario.stream().anyMatch(role -> role.getId().equals(roleId));
   }

    @Override
    public List<UserModel> obtenerRolesDeUsuario(Long userId) {
        return roleUseCase.obtenerRolesDeUsuario(userId);
    }

    @Override
    public List<UserModel> obtenerUsuariosPorRol(Long roleId) {
        return roleUseCase.obtenerUsuariosPorRol(roleId);
    }

 
}
