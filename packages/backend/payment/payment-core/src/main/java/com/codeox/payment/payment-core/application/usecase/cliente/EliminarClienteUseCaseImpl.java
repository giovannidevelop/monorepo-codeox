package cl.codeox.payment.payment_core.application.usecase.cliente;

import java.util.Optional;

import org.springframework.stereotype.Service;

import cl.codeox.payment.payment_core.domain.model.actores.Cliente;
import cl.codeox.payment.payment_core.port.in.cliente.EliminarClienteUseCase;
import cl.codeox.payment.payment_core.port.out.cliente.ClienteRepositoryPort;

@Service
public class EliminarClienteUseCaseImpl implements EliminarClienteUseCase {
    private final ClienteRepositoryPort repository;

    public EliminarClienteUseCaseImpl(ClienteRepositoryPort repository) {
        this.repository = repository;
    }

    @Override
    public void execute(Long id) {
        Optional<Cliente> clienteOpt = repository.findById(id);
        if (clienteOpt.isEmpty()) {
            throw new ClienteNoEncontradoException("Cliente no encontrado con ID: " + id);
        }
        repository.deleteById(id);
    }
}
