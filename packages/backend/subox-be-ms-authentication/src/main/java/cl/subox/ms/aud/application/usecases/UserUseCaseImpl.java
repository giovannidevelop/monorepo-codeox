package cl.subox.ms.aud.application.usecases;

import cl.subox.ms.aud.application.services.TokenService;
import cl.subox.ms.aud.domain.model.entities.RoleModel;
import cl.subox.ms.aud.domain.model.entities.TokenModel;
import cl.subox.ms.aud.domain.model.entities.UserModel;
import cl.subox.ms.aud.domain.model.enums.ERole;
import cl.subox.ms.aud.domain.ports.in.UserUseCase;
import cl.subox.ms.aud.domain.ports.out.RoleRepositoryPort;
import cl.subox.ms.aud.domain.ports.out.TokenRepositoryPort;
import cl.subox.ms.aud.domain.ports.out.UserRepositoryPort;
import cl.subox.ms.aud.infrastructure.entities.UserEntity;
import cl.subox.ms.aud.infrastructure.exceptions.user.UserExistsException;
import cl.subox.ms.aud.infrastructure.exceptions.user.UserNotFoundException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@RequiredArgsConstructor // Lombok para la inyección de dependencias
public class UserUseCaseImpl implements UserUseCase {

    private final UserRepositoryPort userRepositoryPort;
    private final RoleRepositoryPort roleRepositoryPort;
    private final TokenService tokenService;

    private final PasswordEncoder passwordEncoder; // Inyección del PasswordEncoder
    private static final Logger logger = LoggerFactory.getLogger(UserUseCaseImpl.class);
    @Override
    public UserModel registrarUsuario(String username, String password, String email, Set<String> role) {
        logger.info("Registrando usuario: {} - {}", username, email);
    
        validarEntradas(username, password, email);
    
        verificarUsuarioExistente(username);
    
        UserModel user = crearNuevoUsuario(username, password, email);
    
        Set<RoleModel> roles = obtenerRoles(role);
        user.setRoles(roles);
    
        UserModel savedUser = userRepositoryPort.save(user);
        logger.info("Usuario registrado exitosamente: {}", savedUser);
    
        // Llamar a TokenService para crear un token
        //TokenModel tokenModel = tokenService.createVerificationToken(savedUser.getEmail());
        //logger.info("Token de verificación generado: {}", tokenModel.getToken());
    
        return savedUser;
    }

    @Override
    public String iniciarSesion(String username, String password) {
        logger.info("Iniciando sesión para el usuario: {}", username);
        Optional<UserModel> userOptional = userRepositoryPort.findByUsername(username);
        if (userOptional.isPresent()) {
            UserModel user = userOptional.get();
            // Verificar la contraseña codificada
            if (passwordEncoder.matches(password, user.getPassword())) {
                // Autenticación exitosa
                return "TOKEN_DE_SESION_GENERADO"; // Simulación de token
            } else {
                // Contraseña incorrecta
                throw new IllegalArgumentException("Contraseña incorrecta");
            }
        } else {
            // Usuario no encontrado
            throw new IllegalArgumentException("Usuario no encontrado");
        }
    }

    @Override
    public UserModel actualizarPerfil(Long userId, UserModel nuevoUsuario) {
        logger.info("Actualizando perfil del usuario con ID: {}", userId);
        Optional<UserModel> userOptional = userRepositoryPort.findById(userId);
        if (userOptional.isPresent()) {
            UserModel user = userOptional.get();
            // Actualizar datos del usuario
            user.setUsername(nuevoUsuario.getUsername());
            if (nuevoUsuario.getPassword() != null) {
                user.setPassword(passwordEncoder.encode(nuevoUsuario.getPassword())); // Codificar nueva contraseña
            }
            // Guardar cambios en la base de datos
            return userRepositoryPort.save(user);
        } else {
            throw new IllegalArgumentException("Usuario no encontrado");
        }
    }

    @Override
    public void recuperarContraseña(String usernameOrEmail) {
        logger.info("Recuperando contraseña para: {}", usernameOrEmail);
        Optional<UserModel> userOptional = userRepositoryPort.findByUsername(usernameOrEmail);
        if (userOptional.isPresent()) {
            // Simulación de envío de correo electrónico
            System.out.println("Se ha enviado un correo electrónico a " + usernameOrEmail
                    + " con un enlace de recuperación de contraseña.");
        } else {
            // Usuario no encontrado
            throw new IllegalArgumentException("Usuario no encontrado");
        }
    }

    private void validarEntradas(String username, String password, String email) {
        if (username == null || username.trim().isEmpty()) {
            throw new IllegalArgumentException("El nombre de usuario no puede estar vacío.");
        }
        if (password == null || password.length() < 8) {
            throw new IllegalArgumentException("La contraseña debe tener al menos 8 caracteres.");
        }
        if (email == null || !email.matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$")) {
            throw new IllegalArgumentException("El correo electrónico no es válido.");
        }
    }

    private void verificarUsuarioExistente(String username) {
        Optional<UserModel> existingUser = userRepositoryPort.findByUsername(username);
        if (existingUser.isPresent()) {
            throw new UserExistsException("El usuario '" + username + "' ya está en uso.");
        }
    }

    private UserModel crearNuevoUsuario(String username, String password, String email) {
        UserModel user = new UserModel();
        user.setUsername(username);
        user.setEmail(email);
        user.setVerifiedEmail(false);
        user.setPassword(passwordEncoder.encode(password)); // Codificar la contraseña
        user.setCreateTime(LocalDateTime.now(ZoneId.systemDefault())); // Establecer la hora de creación
        return user;
    }

    private Set<RoleModel> obtenerRoles(Set<String> role) {
        Set<RoleModel> roles = new HashSet<>();

        if (role == null || role.isEmpty()) {
            // Asignar rol de usuario por defecto
            RoleModel userRole = roleRepositoryPort.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Rol de usuario no encontrado."));
            roles.add(userRole);
        } else {
            for (String rol : role) {
                try {
                    RoleModel roleModel = roleRepositoryPort.findByName(ERole.valueOf(rol.toUpperCase()))
                            .orElseThrow(() -> new RuntimeException("Error: Rol '" + rol + "' no encontrado."));
                    roles.add(roleModel);
                } catch (IllegalArgumentException e) {
                    throw new IllegalArgumentException("Error: Rol '" + rol + "' no válido.", e);
                }
            }
        }
        return roles;
    }
    @Override
    public Optional<UserModel> obtenerUsuarioPorUsernameOrEmail(String username) {
        return userRepositoryPort.findByUsernameOrEmail(username,username); 
    }
}
