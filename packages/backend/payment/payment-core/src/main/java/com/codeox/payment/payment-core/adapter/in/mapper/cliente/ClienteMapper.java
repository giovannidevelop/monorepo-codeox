package cl.codeox.payment.payment_core.adapter.in.mapper.cliente;


import org.springframework.stereotype.Component;

import cl.codeox.payment.payment_core.adapter.in.dto.cliente.ClienteRequest;
import cl.codeox.payment.payment_core.adapter.in.dto.cliente.ClienteResponse;
import cl.codeox.payment.payment_core.domain.model.actores.Cliente;

@Component
public class ClienteMapper {

    public Cliente toModel(ClienteRequest request) {
        return new Cliente();
    }

    public ClienteResponse toResponse(Cliente cliente) {
        return new ClienteResponse();
    }

    public Cliente toModel(Long id, ClienteRequest request) {
        return new Cliente();
    }
}

