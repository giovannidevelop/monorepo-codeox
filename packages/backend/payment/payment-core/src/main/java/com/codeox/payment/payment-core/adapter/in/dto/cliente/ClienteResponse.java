package cl.codeox.payment.payment_core.adapter.in.dto.cliente;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ClienteResponse {
    private Long id;
    private String nombre;
    private String rut;
    private String telefono;
    private String email;
    private String direccion;
}

