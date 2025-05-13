package cl.subox.ms.aud.infrastructure.exceptions.mail;


public class MailSendingException extends RuntimeException {

    public MailSendingException(String message) {
        super(message);
    }

    public MailSendingException(String message, Throwable cause) {
        super(message, cause);
    }
}
