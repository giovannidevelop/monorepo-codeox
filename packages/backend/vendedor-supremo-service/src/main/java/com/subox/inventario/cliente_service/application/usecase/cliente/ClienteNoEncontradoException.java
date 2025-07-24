package com.subox.inventario.cliente_service.application.usecase.cliente;

public class ClienteNoEncontradoException extends RuntimeException {
    public ClienteNoEncontradoException(String message) {
        super(message);
    }
}