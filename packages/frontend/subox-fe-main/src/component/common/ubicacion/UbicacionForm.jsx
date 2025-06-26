import React, { useEffect, useState } from "react";

import "./UbicacionForm.css";
import Mapa from "./components/Mapa";
import Manual from "./components/Manual";
import { emptyUbicacion } from "./models/ubicacionTypes";

const UbicacionForm = ({ ubicacion = emptyUbicacion, onChange }) => {

  const [modo, setModo] = useState("manual");

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
        {modo === "mapa" ? <Mapa /> : null}
        {modo === "manual" ? <Manual
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
        /> : null}
      </div>
    </div>
  );
};

export default UbicacionForm;
