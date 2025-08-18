package cl.codeox.payment.payment_core.port.in.cliente;

import java.util.List;

import cl.codeox.payment.payment_core.domain.model.actores.Cliente;

public interface ListarClientesUseCase {
    List<Cliente> execute();
}
