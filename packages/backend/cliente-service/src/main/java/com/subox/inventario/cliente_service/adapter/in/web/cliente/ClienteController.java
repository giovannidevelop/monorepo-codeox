package com.subox.inventario.cliente_service.adapter.in.web.cliente;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.subox.inventario.cliente_service.adapter.in.dto.cliente.ClienteRequest;
import com.subox.inventario.cliente_service.adapter.in.dto.cliente.ClienteResponse;
import com.subox.inventario.cliente_service.adapter.in.mapper.cliente.ClienteMapper;
import com.subox.inventario.cliente_service.domain.model.actores.Cliente;
import com.subox.inventario.cliente_service.port.in.cliente.ActualizarClienteUseCase;
import com.subox.inventario.cliente_service.port.in.cliente.CrearClienteUseCase;
import com.subox.inventario.cliente_service.port.in.cliente.EliminarClienteUseCase;
import com.subox.inventario.cliente_service.port.in.cliente.ListarClientesUseCase;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = "*")
public class ClienteController {

    private final CrearClienteUseCase crearUseCase;
    private final ListarClientesUseCase listarUseCase;
    private final ActualizarClienteUseCase actualizarUseCase;
    private final EliminarClienteUseCase eliminarUseCase;
    private final ClienteMapper mapper;

    public ClienteController(CrearClienteUseCase crearUseCase,
                             ListarClientesUseCase listarUseCase,
                             ActualizarClienteUseCase actualizarUseCase,
                             EliminarClienteUseCase eliminarUseCase,
                             ClienteMapper mapper) {
        this.crearUseCase = crearUseCase;
        this.listarUseCase = listarUseCase;
        this.actualizarUseCase = actualizarUseCase;
        this.eliminarUseCase = eliminarUseCase;
        this.mapper = mapper;
    }

    @GetMapping
    public List<ClienteResponse> listAll() {
        List<Cliente> clientes = listarUseCase.execute();
        return clientes.stream()
            .map(mapper::toResponse)
            .collect(Collectors.toList());
    }

    @PostMapping
    public ResponseEntity<ClienteResponse> create(@RequestBody ClienteRequest request) {
        Cliente cliente = mapper.toModel(request);
        Cliente created = crearUseCase.execute(cliente);
        return ResponseEntity.ok(mapper.toResponse(created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClienteResponse> update(@PathVariable Long id,
                                                   @RequestBody ClienteRequest request) {
        Cliente cliente = mapper.toModel(id, request);
        Cliente updated = actualizarUseCase.execute(id, cliente);
        return ResponseEntity.ok(mapper.toResponse(updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        eliminarUseCase.execute(id);
        return ResponseEntity.noContent().build();
    }
}
