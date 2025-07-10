package com.subox.inventario.cliente_service.domain.model.persona;

import java.time.LocalDate;

import com.subox.inventario.cliente_service.domain.model.contacto.Contacto;
import com.subox.inventario.cliente_service.domain.model.ubicacion.Ubicacion;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Persona {
    private Long id;
    private String rut;
    private String nombre;
    private String apellido;
    private String genero;
    private LocalDate fechaNacimiento;
    private String nacionalidad;
    private String estadoCivil;
    private boolean activo;
    private Contacto contacto;
}
