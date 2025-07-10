import React, { useEffect, useState } from "react";

import "./UbicacionForm.css";
import Mapa from "./components/mapa/MapaContainer";
import Manual from "./components/Manual";
import { emptyUbicacion } from "./models/ubicacionTypes";
import "leaflet/dist/leaflet.css";
const UbicacionForm = ({ ubicacion = emptyUbicacion, onChange }) => {
  const [modo, setModo] = useState("manual");
  const [ubicacionMapa, setUbicacionMapa] = useState(null);
  const [referencia, setReferencia] = useState("");

  const handleGuardarUbicacion = async () => {
    if (!ubicacionMapa) return alert("Primero selecciona una ubicación en el mapa");

    const dataFinal = {
      calle: ubicacionMapa.raw.road || "",
      numero: ubicacionMapa.raw.house_number || "",
      complemento: ubicacionMapa.raw.suburb || "",
      referencia,
      codigoPostal: ubicacionMapa.raw.postcode || "",
      comuna: { nombre: ubicacionMapa.raw.city || "" },
      latitude: ubicacionMapa.lat,
      longitude: ubicacionMapa.lng,
      validada: true,
      direccionCompleta: ubicacionMapa.direccion,
    };

    try {
      const res = await fetch("/api/direcciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataFinal),
      });

      if (res.ok) {
        alert("Dirección guardada correctamente");
        onChange?.(dataFinal);
      } else {
        alert("Error al guardar la dirección");
      }
    } catch (error) {
      console.error(error);
      alert("Error al conectar con el servidor");
    }
  };
  const handleModoChange = (nuevoModo) => {
    setModo(nuevoModo);
  };
  return (
    <div className="contenedor-ubicacion">
      <div className="tabs-ubicacion">
        <button
          type="button"
          className={modo !== "manual" ? "tab " : "tab active"}
          onClick={() => handleModoChange("manual")}
        >
          Ingreso Manual
        </button>
        <button
          type="button"
          className={modo !== "mapa" ? "tab " : "tab active"}
          onClick={() => handleModoChange("mapa")}
        >
          Ingreso por Mapa
        </button>
      </div>

      <div >
        {modo === "mapa" && (
          <>
            <Mapa onChange={(ubicacion) => {
              setUbicacionMapa(ubicacion);
              console.log("Ubicación desde el mapa:", ubicacion);
            }} />

            {ubicacionMapa && (
              <div style={{ marginTop: "1rem" }}>
                <label>Referencia:</label>
                <input
                  type="text"
                  value={referencia}
                  onChange={(e) => setReferencia(e.target.value)}
                  placeholder="Ej. frente a plaza, depto 304..."
                  style={{ width: "100%", padding: "0.5rem", marginTop: "0.3rem" }}
                />
                <button
                  type="button"
                  onClick={handleGuardarUbicacion}
                  style={{ marginTop: "1rem" }}
                >
                  Guardar Ubicación
                </button>
              </div>
            )}
          </>
        )}


        {modo === "manual" && <Manual
          ubicacion={ubicacion}
          onChange={(direccion) => console.log("Cambio:", direccion)}
          onGuardar={(direccionFinal) => {
            // Guardar en backend
            fetch("/api/direcciones", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(direccionFinal),
            }).then((res) => {
              if (res.ok) alert("Dirección guardada correctamente");
            });
          }}
        />}
      </div>
    </div>
  );
};

export default UbicacionForm;
