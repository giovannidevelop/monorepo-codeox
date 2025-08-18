package cl.codeox.payment.payment_core.application.usecase.cliente;

public class ClienteNoEncontradoException extends RuntimeException {
    public ClienteNoEncontradoException(String message) {
        super(message);
    }
}