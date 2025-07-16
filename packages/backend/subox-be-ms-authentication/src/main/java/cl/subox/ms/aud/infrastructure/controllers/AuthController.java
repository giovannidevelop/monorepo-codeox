package cl.subox.ms.aud.infrastructure.controllers;

import cl.subox.ms.aud.application.services.TokenService;
import cl.subox.ms.aud.application.services.UserService;
import cl.subox.ms.aud.domain.model.entities.UserModel;
import cl.subox.ms.aud.infrastructure.configs.security.JwtUtils;
import cl.subox.ms.aud.infrastructure.configs.security.UserDetailsImpl;
import cl.subox.ms.aud.infrastructure.entities.dto.JwtDTO;
import cl.subox.ms.aud.infrastructure.entities.dto.LoginDTO;
import cl.subox.ms.aud.infrastructure.entities.dto.RegistrarUsuarioDTO;
import cl.subox.ms.aud.infrastructure.entities.dto.UserResponse;
import cl.subox.ms.aud.infrastructure.exceptions.mail.MailSendingException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth/")
@CrossOrigin(origins = "http://localhost:3000") // Puedes agregar "*" o tu dominio real en producción
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    private final TokenService tokenService;
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    @Autowired
    public AuthController(TokenService tokenService, UserService userService,
                          AuthenticationManager authenticationManager, JwtUtils jwtUtils) {
        this.tokenService = tokenService;
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping("registrar")
    public ResponseEntity<?> registrarUsuario(@RequestBody RegistrarUsuarioDTO user) {
        logger.info("Iniciando registro de usuario: {}", user);

        try {
            UserModel createdUser = userService.registrarUsuario(
                    user.getUsername(),
                    user.getPassword(),
                    user.getEmail(),
                    user.getRole());

            logger.info("Usuario registrado: {}", createdUser);

            UserResponse userResponse = UserResponse.builder()
                    .id(createdUser.getId())
                    .username(createdUser.getUsername())
                    .email(createdUser.getEmail())
                    .isVerifiedEmail(createdUser.isVerifiedEmail())
                    .roles(createdUser.getRoles().stream()
                            .map(role -> role.getName().toString())
                            .collect(Collectors.toSet()))
                    .build();

            return new ResponseEntity<>(userResponse, HttpStatus.CREATED);

        } catch (Exception e) {
            logger.error("Error al registrar usuario: {}", e.getMessage());
            return new ResponseEntity<>("Error al registrar el usuario: " + e.getMessage(), HttpStatus.CONFLICT);
        }
    }

    @PostMapping("login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginDTO loginRequest) {
        Optional<UserModel> userOptional = userService.obtenerUsuarioPorUsernameOrEmail(loginRequest.getUsername());

        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("El usuario no existe.");
        }

        UserModel user = userOptional.get();
        logger.info("Intentando autenticar al usuario: {}", user.getUsername());

        if (!user.isVerifiedEmail()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("El usuario no está habilitado.");
        }

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    ));

            SecurityContextHolder.getContext().setAuthentication(authentication);

            String jwt = jwtUtils.generateJwtToken(authentication);

            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

            var roles = userDetails.getAuthorities().stream()
                    .map(auth -> auth.getAuthority())
                    .collect(Collectors.toList());

            JwtDTO response = new JwtDTO(
                    jwt,
                    userDetails.getId(),
                    userDetails.getUsername(),
                    userDetails.getEmail(),
                    roles
            );

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            logger.error("Error de autenticación: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas.");
        }
    }

    @PostMapping("resend-activation-link")
    public ResponseEntity<?> resendActivationLink(@RequestParam String usernameOrEmail) {
        Optional<UserModel> userOptional = userService.obtenerUsuarioPorUsernameOrEmail(usernameOrEmail);

        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado.");
        }

        UserModel user = userOptional.get();

        if (!user.isVerifiedEmail()) {
            try {
                tokenService.regenerateToken(user.getEmail());
                return ResponseEntity.ok("El enlace de activación ha sido enviado a tu correo: " + user.getEmail());
            } catch (MailSendingException e) {
                logger.error("Error al enviar el correo de activación: {}", e.getMessage());
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("No se pudo enviar el correo de activación. Inténtalo de nuevo más tarde.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("El usuario ya ha verificado su correo.");
        }
    }

    @GetMapping("verify-email")
    public ResponseEntity<String> verifyToken(@RequestParam("token") String token) {
        logger.info("Verificando token: {}", token);

        boolean isVerified = tokenService.verifyToken(token);

        if (isVerified) {
            return new ResponseEntity<>("Token verificado con éxito.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Token inválido o expirado.", HttpStatus.BAD_REQUEST);
        }
    }
}
