package cl.subox.ms.aud.application.usecases;

import lombok.RequiredArgsConstructor;

import cl.subox.ms.aud.domain.model.entities.TokenModel;
import cl.subox.ms.aud.domain.model.entities.UserModel;
import cl.subox.ms.aud.domain.ports.in.TokenUseCase;
import cl.subox.ms.aud.domain.ports.out.TokenRepositoryPort;
import cl.subox.ms.aud.domain.ports.out.UserRepositoryPort;
import cl.subox.ms.aud.infrastructure.client.MailServiceClient;
import cl.subox.ms.aud.infrastructure.entities.TokenEntity;
import cl.subox.ms.aud.infrastructure.entities.UserEntity;
import cl.subox.ms.aud.infrastructure.entities.dto.MailRequest;
import cl.subox.ms.aud.infrastructure.exceptions.token.InvalidTokenException;
import cl.subox.ms.aud.infrastructure.exceptions.user.UserExistsException;
import java.time.LocalDateTime;
import java.util.UUID;

@RequiredArgsConstructor
public class TokenUseCaseImpl implements TokenUseCase {

    private final MailServiceClient mailServiceClient; // Cliente para el envío del correo
    private final TokenRepositoryPort tokenRepository; // Puerto para guardar el token
    private final UserRepositoryPort userRepositoryPort; // Puerto para la búsqueda del usuario

    @Override
    public TokenModel createVerificationToken(String usernameOrEmail) {

        // Validar el input
        if (usernameOrEmail == null || usernameOrEmail.trim().isEmpty()) {
            throw new IllegalArgumentException("El nombre de usuario o correo electrónico no puede estar vacío.");
        }

        // Buscar al usuario por nombre de usuario o correo electrónico
        UserModel user = userRepositoryPort.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail)
                .orElseThrow(() -> new UserExistsException("Usuario no encontrado"));

        // Generar el token de verificación
        String verificationToken = generateToken();

        // Enviar el correo al usuario
        String subject = "Verificación de correo electrónico";
        String verificationUrl = "http://localhost:7000/api/auth/verify-email?token=" + verificationToken;
        String body = "Hola,\n\n"
                + "Gracias por registrarte. Por favor, verifica tu correo electrónico usando el siguiente enlace:\n\n"
                + verificationUrl + "\n\n"
                + "Si no te registraste en nuestro sistema, puedes ignorar este correo.\n\n"
                + "Saludos,\n"
                + "El equipo de Subox";
        MailRequest emailRequest = new MailRequest(user.getEmail(), subject, body);
        mailServiceClient.sendVerificationEmail(emailRequest);

        // Crear el TokenModel
        TokenModel tokenModel = new TokenModel();
        tokenModel.setToken(verificationToken);
        tokenModel.setUser(user); // Asocia el usuario al token
        tokenModel.setExpiryDate(LocalDateTime.now().plusHours(1)); // Ejemplo: el token expira en 1 hora

        // Convertir TokenModel a TokenEntity y guardar
        TokenEntity tokenEntity = TokenEntity.fromModel(tokenModel);
        tokenRepository.save(tokenEntity);

        // Retornar el token generado
        return tokenModel;
    }

    // Método privado para generar el token
    private String generateToken() {
        return UUID.randomUUID().toString(); // Puedes usar JWT o cualquier otro formato de token
    }

    @Override
    public boolean verifyToken(String token) {
        // Buscar el token en el repositorio
        TokenEntity tokenEntity = tokenRepository.findByToken(token)
                .orElseThrow(() -> new InvalidTokenException("Token no encontrado"));

        // Verificar si el token ha expirado
        if (tokenEntity.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new InvalidTokenException("El token ha expirado");
        }

        // Obtener la entidad de usuario asociada al token
        UserEntity userEntity = tokenEntity.getUser();

        // Habilitar al usuario
        userEntity.setVerifiedEmail(true);

        // Guardar los cambios en el repositorio
        userRepositoryPort.save(userEntity.toUserModel()); // Cambia esto si tu repositorio espera una entidad

        return true; // Retornar el resultado de la activación
    }

    @Override
    public TokenModel regenerateToken(String username) {
        // Genera un nuevo token de verificación para el usuario
        return createVerificationToken(username);
    }

}
