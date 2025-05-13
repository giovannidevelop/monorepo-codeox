package cl.subox.ms.aud.infrastructure.exceptions;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import cl.subox.ms.aud.infrastructure.exceptions.mail.MailSendingException;
import cl.subox.ms.aud.infrastructure.exceptions.token.InvalidTokenException;
import cl.subox.ms.aud.infrastructure.exceptions.user.UserExistsException;
import cl.subox.ms.aud.infrastructure.exceptions.user.UserNotFoundException;

@ControllerAdvice
public class GlobalExceptionHandler {
    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(UserExistsException.class)
    public ResponseEntity<Object> handleUsuarioExistenteException(UserExistsException ex, WebRequest request) {
        logger.error("Error registering user: {}", ex.getMessage());
        return new ResponseEntity<>("El usuario ya está registrado", HttpStatus.CONFLICT);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<Object> handleUserNotFoundException(UserNotFoundException ex, WebRequest request) {
        logger.error("User not found: {}", ex.getMessage());
        return new ResponseEntity<>("Usuario no encontrado", HttpStatus.NOT_FOUND);
    }
    // Manejo de InvalidTokenException
    @ExceptionHandler(InvalidTokenException.class)
    public ResponseEntity<Object> handleInvalidTokenException(InvalidTokenException ex, WebRequest request) {
        logger.error("Token inválido: {}", ex.getMessage());
        return new ResponseEntity<>("El token proporcionado no es válido o ha expirado.", HttpStatus.BAD_REQUEST);
    }

        // Manejo de InvalidTokenException
        @ExceptionHandler(MailSendingException.class)
        public ResponseEntity<Object> handleMailSendingException(MailSendingException ex, WebRequest request) {
            logger.error("Token inválido: {}", ex.getMessage());
            return new ResponseEntity<>("Error al enviar correo.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleGlobalException(Exception ex, WebRequest request) {
        logger.error("Unhandled error: {}", ex.getMessage(), ex);
        return new ResponseEntity<>("Ocurrió un error inesperado", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
