package cl.codeox.payment.payment_core.domain.model.actores;

import cl.codeox.payment.payment_core.domain.model.persona.Persona;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Cliente extends Persona {
    private String tipoCliente;    
    private String formaPago;
}
