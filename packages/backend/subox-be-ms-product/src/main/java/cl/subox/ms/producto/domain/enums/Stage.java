package cl.subox.ms.producto.domain.enums;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public enum Stage {
    VALIDACION_PRECONDICIONES,
    GENERACION_SESION_BIOMETRICA,
    VALIDACION_SESION_BIOMETRICA,
    VALIDACION_RENTA,
    VALIDACION_CONTACTABILIDAD,
    OBTENCION_REGIONES,
    GENERACION_PREGUNTAS,
    VALIDACION_PREGUNTAS,
    OBTENER_REGIONES_CON_SUCURSAL,
    OBTENER_COMUNAS_CON_SUCURSAL,
    OBTENCION_SUCURSALES_POR_SEGMENTO,
    GENERACION_CONTRATO,
    GENERACION_CUENTA,
    VALIDACION_ESTADO_CUENTA,
    EVALUACION_CLIENTE_BANCA,
    ESTADO_SITUACION;

    Stage() {
    }

    public static List<Stage> getStagesByString(String stages) {
        return Stream.of(stages.split(",", -1)).map(Stage::existValueOf).filter(Objects::nonNull).collect(Collectors.toList());
    }

    private static Stage existValueOf(String value) {
        try {
            return valueOf(value);
        } catch (Exception var2) {
            return null;
        }
    }
}
