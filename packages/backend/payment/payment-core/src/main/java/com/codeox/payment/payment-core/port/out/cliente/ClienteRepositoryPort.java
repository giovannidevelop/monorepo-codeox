package cl.codeox.payment.payment_core.port.out.cliente;

import java.util.List;
import java.util.Optional;

import cl.codeox.payment.payment_core.domain.model.actores.Cliente;

public interface ClienteRepositoryPort {
    Cliente save(Cliente cliente);
    Optional<Cliente> findById(Long id);
    List<Cliente> findAll();
    void deleteById(Long id);
}