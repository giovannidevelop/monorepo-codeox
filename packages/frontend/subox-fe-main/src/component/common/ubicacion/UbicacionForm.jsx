// src/components/UbicacionForm.jsx

import React, { useEffect, useState } from "react";
import {
  obtenerRegiones,
  obtenerProvinciasPorRegion,
  obtenerComunasPorProvincia
} from "./services/ubicacionService";
import { emptyUbicacion } from "./models/ubicacionTypes";
import "./UbicacionForm.css";

const UbicacionForm = ({ ubicacion = emptyUbicacion, onChange }) => {
  const [regiones, setRegiones] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [comunas, setComunas] = useState([]);
  const [local, setLocal] = useState(ubicacion);

  // Obtener regiones al montar
  useEffect(() => {
    obtenerRegiones().then(setRegiones);
  }, []);

  // Provincias cuando cambia región
  useEffect(() => {
    if (local.regionId) {
      obtenerProvinciasPorRegion(local.regionId).then(setProvincias);
    } else {
      setProvincias([]);
    }
    setLocal(prev => ({ ...prev, provinciaId: '', comunaId: '' }));
    setComunas([]);
  }, [local.regionId]);

  // Comunas cuando cambia provincia
  useEffect(() => {
    if (local.provinciaId) {
      obtenerComunasPorProvincia(local.provinciaId).then(setComunas);
    } else {
      setComunas([]);
    }
    setLocal(prev => ({ ...prev, comunaId: '' }));
  }, [local.provinciaId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...local, [name]: value };
    setLocal(updated);
    onChange(updated); // notifica al padre
  };

  return (
    <div className="ubicacion-form">
      <div>
        <label>Región</label>
        <select name="regionId" value={local.regionId} onChange={handleChange}>
          <option value="">Seleccione una región</option>
          {regiones.map(r => (
            <option key={r.id} value={r.id}>{r.nombre}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Provincia</label>
        <select name="provinciaId" value={local.provinciaId} onChange={handleChange}>
          <option value="">Seleccione una provincia</option>
          {provincias.map(p => (
            <option key={p.id} value={p.id}>{p.nombre}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Comuna</label>
        <select name="comunaId" value={local.comunaId} onChange={handleChange}>
          <option value="">Seleccione una comuna</option>
          {comunas.map(c => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Calle</label>
        <input name="calle" value={local.calle} onChange={handleChange} />
      </div>

      <div>
        <label>Número</label>
        <input name="numero" value={local.numero} onChange={handleChange} />
      </div>

      <div>
        <label>Departamento</label>
        <input name="departamento" value={local.departamento} onChange={handleChange} />
      </div>

      <div>
        <label>Referencia</label>
        <input name="referencia" value={local.referencia} onChange={handleChange} />
      </div>

      <div>
        <label>Código Postal</label>
        <input name="codigoPostal" value={local.codigoPostal} onChange={handleChange} />
      </div>
    </div>
  );
};

export default UbicacionForm;
