package com.subox.inventario.cliente_service.domain.model.actores;

import java.time.LocalDate;

import com.subox.inventario.cliente_service.domain.model.persona.Persona;

public class Empleado  extends Persona {
    private String cargo;
    private LocalDate fechaIngreso;
    private int sueldo;
    // Otros campos propios de empleado
}