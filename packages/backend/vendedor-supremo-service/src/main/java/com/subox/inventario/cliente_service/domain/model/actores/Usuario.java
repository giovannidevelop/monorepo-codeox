package com.subox.inventario.cliente_service.domain.model.actores;

import java.util.Set;

import com.subox.inventario.cliente_service.domain.model.persona.Persona;

public class Usuario {
    private Long id;
    private String username;
    private String passwordHash;
    private Persona persona;        // Asociación a la persona (empleado, cliente, etc.)
    private Set<Rol> roles;         // Roles: ADMIN, VENDEDOR, CLIENTE, etc.
    private boolean activo;
}