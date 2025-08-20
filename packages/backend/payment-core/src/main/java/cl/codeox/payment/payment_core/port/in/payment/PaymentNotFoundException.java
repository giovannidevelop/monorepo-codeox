package cl.codeox.payment.payment_core.port.in.payment;

public class PaymentNotFoundException extends RuntimeException {
  public PaymentNotFoundException(Long id) {
    super("Payment no encontrado: id=" + id);
  }
}