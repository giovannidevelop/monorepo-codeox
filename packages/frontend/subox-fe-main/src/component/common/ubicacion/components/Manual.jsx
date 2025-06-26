import React, { useEffect, useState } from "react";
import { emptyUbicacion } from "../models/ubicacionTypes";
import {
    obtenerRegiones,
    obtenerProvinciasPorRegion,
    obtenerComunasPorProvincia,
} from "../services/ubicacionService";

const Manual = ({ ubicacion = emptyUbicacion, onChange }) => {
    const [local, setLocal] = useState(ubicacion);
    const [regiones, setRegiones] = useState([]);
    const [provincias, setProvincias] = useState([]);
    const [comunas, setComunas] = useState([]);
    const [errores, setErrores] = useState({});
    const [guardado, setGuardado] = useState(false);
    const [paso, setPaso] = useState(1);

    useEffect(() => {
        obtenerRegiones().then(setRegiones);
    }, []);

    useEffect(() => {
        if (local.regionId) {
            obtenerProvinciasPorRegion(local.regionId).then(setProvincias);
        } else {
            setProvincias([]);
        }
        limpiar(["provinciaId", "comunaId"]);
    }, [local.regionId]);

    useEffect(() => {
        if (local.provinciaId) {
            obtenerComunasPorProvincia(local.provinciaId).then(setComunas);
        } else {
            setComunas([]);
        }
        limpiar(["comunaId"]);
    }, [local.provinciaId]);

    const limpiar = (campos) => {
        setLocal((prev) => {
            const nuevo = { ...prev };
            campos.forEach((campo) => (nuevo[campo] = ""));
            return nuevo;
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updated = { ...local, [name]: value };
        setLocal(updated);
        if (onChange) onChange(updated);
        if (errores[name]) {
            setErrores((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const validarPaso1 = () => {
        const campos = ["regionId", "provinciaId", "comunaId"];
        const nuevosErrores = {};
        campos.forEach((campo) => {
            if (!local[campo]) nuevosErrores[campo] = "Este campo es obligatorio";
        });
        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const validarPaso2 = () => {
        const campos = ["calle", "numero"];
        const nuevosErrores = {};
        campos.forEach((campo) => {
            if (!local[campo]) nuevosErrores[campo] = "Este campo es obligatorio";
        });
        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const handleAccionPrincipal = () => {
        if (paso === 1) {
            if (validarPaso1()) setPaso(2);
        } else if (paso === 2) {
            if (validarPaso2()) setPaso(3);
        } else if (paso === 3) {
            setGuardado(true);    
            console.log(local);
            alert("✅ Dirección final guardada correctamente.");
            setPaso(1);
                  
            setLocal(emptyUbicacion);
        }
    };

    const getNombrePorId = (lista, id) => {
        const item = lista.find((el) => String(el.id) === String(id));
        return item ? item.nombre : "(sin nombre)";
    };

    const InputGroup = ({ label, name, value, type = "text" }) => (
        <div className={`input-group ${errores[name] ? "error" : ""}`}>
            <label htmlFor={name}>{label}</label>
            <input
                id={name}
                name={name}
                value={value}
                type={type}
                onChange={handleChange}
                placeholder={`Ingrese ${label.toLowerCase()}`}
            />
            {errores[name] && <span className="error-message">{errores[name]}</span>}
        </div>
    );

    const SelectGroup = ({ label, name, value, options, disabled = false }) => (
        <div className={`input-group ${errores[name] ? "error" : ""}`}>
            <label htmlFor={name}>{label}</label>
            <select
                id={name}
                name={name}
                value={value}
                onChange={handleChange}
                disabled={disabled}
            >
                <option value="">Seleccione {label.toLowerCase()}</option>
                {options.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                        {opt.nombre}
                    </option>
                ))}
            </select>
            {errores[name] && <span className="error-message">{errores[name]}</span>}
        </div>
    );

    return (
        <div className="ubicacion-form">
            <form onSubmit={(e) => e.preventDefault()}>
                {paso === 1 && (
                    <fieldset className="container-one">
                        <legend>Paso 1: Ubicación geográfica</legend>
                        <SelectGroup label="Región" name="regionId" value={local.regionId} options={regiones} />
                        <SelectGroup label="Provincia" name="provinciaId" value={local.provinciaId} options={provincias} disabled={!local.regionId} />
                        <SelectGroup label="Comuna" name="comunaId" value={local.comunaId} options={comunas} disabled={!local.provinciaId} />
                    </fieldset>
                )}

                {paso === 2 && (
                    <>
                        <div className="resumen-ubicacion">
                            <h4>Resumen ubicación</h4>
                            <p><strong>Región:</strong> {getNombrePorId(regiones, local.regionId)}</p>
                            <p><strong>Provincia:</strong> {getNombrePorId(provincias, local.provinciaId)}</p>
                            <p><strong>Comuna:</strong> {getNombrePorId(comunas, local.comunaId)}</p>
                        </div>
                        <fieldset className="container-two">
                            <legend>Paso 2: Dirección detallada</legend>
                            <InputGroup label="Calle" name="calle" value={local.calle} />
                            <InputGroup label="Número" name="numero" value={local.numero} />
                            <InputGroup label="Referencia" name="referencia" value={local.referencia} />
                            <InputGroup label="Departamento" name="departamento" value={local.departamento} />
                            <InputGroup label="Oficina" name="oficina" value={local.oficina} />
                            <InputGroup label="Código Postal" name="codigoPostal" value={local.codigoPostal} />
                        </fieldset>
                    </>
                )}

                {paso === 3 && (
                    <fieldset className="container-three">
                        <legend>Paso 3: Resumen final</legend>
                        <div className="resumen-ubicacion">
                            <p><strong>Región:</strong> {getNombrePorId(regiones, local.regionId)}</p>
                            <p><strong>Provincia:</strong> {getNombrePorId(provincias, local.provinciaId)}</p>
                            <p><strong>Comuna:</strong> {getNombrePorId(comunas, local.comunaId)}</p>
                            <p><strong>Calle:</strong> {local.calle}</p>
                            <p><strong>Número:</strong> {local.numero}</p>
                            <p><strong>Referencia:</strong> {local.referencia || "(opcional)"}</p>
                            <p><strong>Departamento:</strong> {local.departamento || "(opcional)"}</p>
                            <p><strong>Oficina:</strong> {local.oficina || "(opcional)"}</p>
                            <p><strong>Código Postal:</strong> {local.codigoPostal || "(opcional)"}</p>
                        </div>
                    </fieldset>
                )}
            </form>

            <div className="buttons-row">
                {paso > 1 && (
                    <button type="button" onClick={() => setPaso(paso - 1)} className="volver-btn">
                        Anterior
                    </button>
                )}
                <button type="button" onClick={handleAccionPrincipal} className="guardar-btn">
                    {paso === 1 && "Siguiente"}
                    {paso === 2 && "Siguiente"}
                    {paso === 3 && "Guardar dirrección"}
                </button>
            </div>
        </div>
    );
};

export default Manual;
