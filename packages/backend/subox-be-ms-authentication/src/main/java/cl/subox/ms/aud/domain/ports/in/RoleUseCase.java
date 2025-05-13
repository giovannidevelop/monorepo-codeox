package cl.subox.ms.aud.domain.ports.in;


import java.util.List;

import cl.subox.ms.aud.domain.model.entities.UserModel;


/*
asignarRolAUsuario: Asigna un rol específico a un usuario.
removerRolDeUsuario: Remueve un rol específico de un usuario.
usuarioTieneRol: Verifica si un usuario tiene un rol específico.
obtenerRolesDeUsuario: Obtiene todos los roles asignados a un usuario.
obtenerUsuariosPorRol: Obtiene todos los usuarios que tienen un rol específico.
 */
public interface RoleUseCase {
    UserModel asignarRolAUsuario(Long userId, Long roleId);
    UserModel removerRolDeUsuario(Long userId, Long roleId);
    boolean usuarioTieneRol(Long userId, Long roleId);
    List<UserModel> obtenerRolesDeUsuario(Long userId);
    List<UserModel> obtenerUsuariosPorRol(Long roleId);

}
