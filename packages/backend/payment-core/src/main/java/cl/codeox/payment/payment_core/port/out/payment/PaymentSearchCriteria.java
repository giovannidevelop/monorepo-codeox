package cl.codeox.payment.payment_core.port.out.payment;

import java.time.Instant;

import cl.codeox.payment.payment_core.domain.payment.PaymentStatus;

/** Criterios opcionales para búsquedas combinadas. */
public record PaymentSearchCriteria(
    String commerceOrder,
    String token,
    Long flowOrder,
    String email,
    PaymentStatus status,
    Instant createdFrom,
    Instant createdTo
) {}