package cl.codeox.payment.payment_core.application.usecase.cliente;

import java.util.List;

import org.springframework.stereotype.Service;

import cl.codeox.payment.payment_core.domain.model.actores.Cliente;
import cl.codeox.payment.payment_core.port.in.cliente.ListarClientesUseCase;
import cl.codeox.payment.payment_core.port.out.cliente.ClienteRepositoryPort;

@Service
public class ListarClientesUseCaseImpl implements ListarClientesUseCase {
    private final ClienteRepositoryPort repository;

    public ListarClientesUseCaseImpl(ClienteRepositoryPort repository) {
        this.repository = repository;
    }

    @Override
    public List<Cliente> execute() {
        return repository.findAll();
    }
}

