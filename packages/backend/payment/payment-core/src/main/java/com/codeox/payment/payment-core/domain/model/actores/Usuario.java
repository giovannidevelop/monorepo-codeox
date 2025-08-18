package cl.codeox.payment.payment_core.domain.model.actores;

import java.util.Set;

import cl.codeox.payment.payment_core.domain.model.persona.Persona;

public class Usuario {
    private Long id;
    private String username;
    private String passwordHash;
    private Persona persona;        // Asociación a la persona (empleado, cliente, etc.)
    private Set<Rol> roles;         // Roles: ADMIN, VENDEDOR, CLIENTE, etc.
    private boolean activo;
}