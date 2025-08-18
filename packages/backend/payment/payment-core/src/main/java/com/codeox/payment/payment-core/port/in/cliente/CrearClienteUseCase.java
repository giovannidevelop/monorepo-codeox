
package cl.codeox.payment.payment_core.port.in.cliente;

import cl.codeox.payment.payment_core.domain.model.actores.Cliente;

public interface CrearClienteUseCase {
    Cliente execute(Cliente cliente);
}
