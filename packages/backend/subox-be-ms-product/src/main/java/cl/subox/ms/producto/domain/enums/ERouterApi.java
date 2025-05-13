package cl.subox.ms.producto.domain.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpMethod;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@AllArgsConstructor
@Getter
public enum ERouterApi {

    API_EVALUACION_INGRESO(
            "/evaluacion",
            HttpMethod.POST,
            null, List.of(Stage.VALIDACION_PRECONDICIONES)),
    API_EVALUACION_PRECONDICIONES(
            "/evaluacion/precondiciones",
            HttpMethod.GET,
            List.of(Stage.VALIDACION_PRECONDICIONES),
            List.of(Stage.GENERACION_SESION_BIOMETRICA)),
    API_SESION_BIOMETRICA(
            "/biometria/sesion",
            HttpMethod.POST,
            List.of(Stage.GENERACION_SESION_BIOMETRICA),
            List.of(Stage.GENERACION_SESION_BIOMETRICA,
                    Stage.VALIDACION_SESION_BIOMETRICA)),
    API_VALIDA_SESION_BIOMETRICA(
            "/biometria/sesion/{idSesion}",
            HttpMethod.GET,
            List.of(Stage.VALIDACION_SESION_BIOMETRICA),
            List.of(Stage.GENERACION_PREGUNTAS)),
    API_GENERACION_PREGUNTAS_SEGURIDAD(
            "/desafios/preguntas",
            HttpMethod.GET,
            List.of(Stage.GENERACION_PREGUNTAS),
            List.of(Stage.GENERACION_PREGUNTAS,
                    Stage.VALIDACION_PREGUNTAS)),
    API_VALIDAR_PREGUNTAS(
            "/desafios/preguntas",
            HttpMethod.POST,
            List.of(Stage.VALIDACION_PREGUNTAS),
            List.of(Stage.GENERACION_PREGUNTAS,
                    Stage.VALIDACION_PREGUNTAS,
                    Stage.VALIDACION_RENTA)),
    API_EVALUACION_RENTA(
            "/evaluacion/renta",
            HttpMethod.POST,
            List.of(Stage.VALIDACION_RENTA),
            List.of(Stage.VALIDACION_RENTA,
                    Stage.OBTENCION_REGIONES,
                    Stage.VALIDACION_CONTACTABILIDAD,
                    Stage.ESTADO_SITUACION)),
    API_ESTADO_SITUACION(
            "/estado-situacion/{tipo}",
            HttpMethod.GET,
            List.of(Stage.ESTADO_SITUACION),
            List.of(Stage.ESTADO_SITUACION,
                    Stage.GENERACION_PREGUNTAS,
                    Stage.OBTENCION_REGIONES,
                    Stage.VALIDACION_CONTACTABILIDAD,
                    Stage.EVALUACION_CLIENTE_BANCA)),
    API_SEGURIDAD_CONTACTO(
            "/evaluacion/contactos/{contactoId}",
            HttpMethod.GET,
            List.of(Stage.VALIDACION_CONTACTABILIDAD),
            List.of(Stage.ESTADO_SITUACION,
                    Stage.GENERACION_PREGUNTAS,
                    Stage.OBTENCION_REGIONES,
                    Stage.VALIDACION_CONTACTABILIDAD,
                    Stage.EVALUACION_CLIENTE_BANCA)),
    API_EVALUACION_CLIENTE_BANCA(
            "/evaluacion/clientes/banca",
            HttpMethod.GET,
            List.of(Stage.EVALUACION_CLIENTE_BANCA),
            List.of(Stage.OBTENER_REGIONES_CON_SUCURSAL,
                    Stage.GENERACION_CONTRATO)),
    API_GEOGRAFICOS_REGIONES(
            "/regiones",
            HttpMethod.GET,
            List.of(Stage.OBTENCION_REGIONES,
                    Stage.OBTENER_REGIONES_CON_SUCURSAL,
                    Stage.OBTENCION_SUCURSALES_POR_SEGMENTO,
                    Stage.GENERACION_CONTRATO),
            List.of(Stage.ESTADO_SITUACION,
                    Stage.GENERACION_PREGUNTAS,
                    Stage.OBTENCION_REGIONES,
                    Stage.VALIDACION_CONTACTABILIDAD,
                    Stage.EVALUACION_CLIENTE_BANCA)),
    API_GEOGRAFICOS_REGIONES_SUCURSALES(
            "/regiones/bancarizadas",
            HttpMethod.GET,
            List.of(Stage.OBTENER_REGIONES_CON_SUCURSAL,
                    Stage.OBTENCION_SUCURSALES_POR_SEGMENTO,
                    Stage.ESTADO_SITUACION),
            List.of(Stage.OBTENER_REGIONES_CON_SUCURSAL,
                    Stage.OBTENER_COMUNAS_CON_SUCURSAL,
                    Stage.GENERACION_CONTRATO)),
    API_GEOGRAFICOS_REGION_COMUNAS(
            "/regiones/{idRegion}/comunas",
            HttpMethod.GET,
            List.of(Stage.OBTENER_COMUNAS_CON_SUCURSAL),
            List.of(Stage.OBTENCION_SUCURSALES_POR_SEGMENTO,
                    Stage.GENERACION_CONTRATO)),
    API_SUCURSALES_POR_SEGMENTO(
            "/regiones/comuna/{id}/sucursales",
            HttpMethod.GET,
            List.of(Stage.OBTENCION_SUCURSALES_POR_SEGMENTO),
            List.of(Stage.GENERACION_CONTRATO,
                    Stage.OBTENER_COMUNAS_CON_SUCURSAL,
                    Stage.OBTENCION_SUCURSALES_POR_SEGMENTO)),
    API_GENERACION_CONTRATO(
            "/documentos/contrato",
            HttpMethod.GET,
            List.of(Stage.GENERACION_CONTRATO, Stage.VALIDACION_PRECONDICIONES),
            List.of(Stage.GENERACION_CUENTA,
                    Stage.GENERACION_CONTRATO)),
    API_GENERACION_VENTA(
            "/ventas",
            HttpMethod.POST,
            List.of(Stage.GENERACION_CUENTA),
            List.of(Stage.VALIDACION_ESTADO_CUENTA));


    private static final Map<String, ERouterApi> apis = new HashMap<>();
    private static final Map<String, List<Stage>> mapPermitidos = new HashMap<>();
    private static final Map<String, List<Stage>> mapSalidas = new HashMap<>();

    static {

        Arrays.stream(ERouterApi.values()).forEach(
                p -> {
                    mapPermitidos.put(p.path, p.getStagesPermitidos());
                    mapSalidas.put(p.path, p.getStageSalida());
                    apis.put(p.getMethod().toString() + ":" + p.path, p);
                }
        );
    }

    private final String path;
    private final HttpMethod method;
    private final List<Stage> stagesPermitidos;
    private final List<Stage> stageSalida;

    public static ERouterApi getApiByPath(String path, HttpMethod method) {
        return apis.get(method.toString() + ":" + path);
    }
}
