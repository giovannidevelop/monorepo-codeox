package cl.codeox.payment.payment_core.adapter.in.dto.cliente;


import lombok.Data;

@Data
public class ClienteRequest {
    private String nombre;
    private String rut;
    private String telefono;
    private String email;
    private String direccion;
}
