package cl.codeox.payment.payment_core.domain.model.contacto;

import cl.codeox.payment.payment_core.domain.model.ubicacion.Ubicacion;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Contacto {
    private Long id;
    private Telefono telefono;
    private Email email;
    private Ubicacion ubicacion;
}
