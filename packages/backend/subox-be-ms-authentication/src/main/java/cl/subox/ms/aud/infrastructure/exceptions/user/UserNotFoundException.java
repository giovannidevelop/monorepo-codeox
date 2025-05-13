package cl.subox.ms.aud.infrastructure.exceptions.user;

public class UserNotFoundException extends UserException {

    public UserNotFoundException(String message) {
        super(message);
    }

    public UserNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
