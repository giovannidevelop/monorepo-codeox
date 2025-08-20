package cl.codeox.payment.payment_core.port.in.payment;


public class PaymentConflictException extends RuntimeException {
  public PaymentConflictException(String message) {
    super(message);
  }
}
