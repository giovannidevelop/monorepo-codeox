package cl.subox.ms.aud.infrastructure.exceptions.user;

public class UserExistsException extends UserException {

    public UserExistsException(String message) {
        super(message);
    }

    public UserExistsException(String message, Throwable cause) {
        super(message, cause);
    }
}
