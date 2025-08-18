package cl.codeox.payment.payment_core.port.in.cliente;

import cl.codeox.payment.payment_core.domain.model.actores.Cliente;

public interface ActualizarClienteUseCase {
    Cliente execute(Long id, Cliente cliente);
}
