package cl.codeox.payment.payment_core.domain.model.actores;

import java.time.LocalDate;

import cl.codeox.payment.payment_core.domain.model.persona.Persona;

public class Empleado  extends Persona {
    private String cargo;
    private LocalDate fechaIngreso;
    private int sueldo;
}