package cl.subox.ms.aud.infrastructure.exceptions.token;

public class InvalidTokenException  extends RuntimeException {
    public InvalidTokenException(String message) {
        super(message);
    }

    public InvalidTokenException(String message, Throwable cause) {
        super(message, cause);
    }
}