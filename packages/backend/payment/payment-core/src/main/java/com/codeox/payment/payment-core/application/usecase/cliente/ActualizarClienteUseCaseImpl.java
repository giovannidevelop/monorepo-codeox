package cl.codeox.payment.payment_core.application.usecase.cliente;

import org.springframework.stereotype.Service;

import cl.codeox.payment.payment_core.domain.model.actores.Cliente;
import cl.codeox.payment.payment_core.port.in.cliente.ActualizarClienteUseCase;
import cl.codeox.payment.payment_core.port.out.cliente.ClienteRepositoryPort;

import java.util.Optional;

@Service
public class ActualizarClienteUseCaseImpl implements ActualizarClienteUseCase {
    private final ClienteRepositoryPort repository;

    public ActualizarClienteUseCaseImpl(ClienteRepositoryPort repository) {
        this.repository = repository;
    }

    @Override
    public Cliente execute(Long id, Cliente cliente) {
        Optional<Cliente> existing = repository.findById(id);
        if (existing.isEmpty()) {
            throw new RuntimeException("Cliente no encontrado");
        }
        Cliente toUpdate = existing.get();
        toUpdate.setNombre(cliente.getNombre());
        toUpdate.setRut(cliente.getRut());
        return repository.save(toUpdate);
    }
}

