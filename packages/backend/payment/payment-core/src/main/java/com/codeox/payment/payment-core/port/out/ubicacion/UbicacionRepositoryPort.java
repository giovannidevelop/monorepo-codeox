package cl.codeox.payment.payment_core.port.out.ubicacion;

import cl.codeox.payment.payment_core.domain.model.ubicacion.Ubicacion;

import java.util.List;
import java.util.Optional;

public interface UbicacionRepositoryPort {

    Ubicacion guardar(Ubicacion ubicacion);  // Crear o actualizar una ubicación

    Optional<Ubicacion> buscarPorId(Long id);

    List<Ubicacion> buscarPorComunaId(Long comunaId);

    List<Ubicacion> buscarPorCalleYNumero(String calle, String numero);

    List<Ubicacion> buscarTodas();
    
    void eliminarPorId(Long id);

    boolean existeUbicacionValidada(String direccionCompleta);
}
