package cl.codeox.payment.payment_core.application.usecase.cliente;


import org.springframework.stereotype.Service;

import cl.codeox.payment.payment_core.domain.model.actores.Cliente;
import cl.codeox.payment.payment_core.port.in.cliente.CrearClienteUseCase;
import cl.codeox.payment.payment_core.port.out.cliente.ClienteRepositoryPort;

@Service
public class CrearClienteUseCaseImpl implements CrearClienteUseCase {
    private final ClienteRepositoryPort repository;

    public CrearClienteUseCaseImpl(ClienteRepositoryPort repository) {
        this.repository = repository;
    }

    @Override
    public Cliente execute(Cliente cliente) {
        return repository.save(cliente);
    }
}
