import React, { useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import { obtenerDireccionDesdeCoordenadas } from "./helpers";

const MarcadorInteractivo = ({ onUbicacionSeleccionada }) => {
  const [posicion, setPosicion] = useState(null);
  const [direccion, setDireccion] = useState("");

  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      setPosicion({ lat, lng });

      const { direccion, datosCrudos } = await obtenerDireccionDesdeCoordenadas(lat, lng);
      setDireccion(direccion);

      if (onUbicacionSeleccionada) {
        onUbicacionSeleccionada({
          lat,
          lng,
          direccion,
          raw: datosCrudos,
        });
      }
    },
  });

  return posicion ? (
    <Marker position={posicion}>
      <Popup>{direccion}</Popup>
    </Marker>
  ) : null;
};

export default MarcadorInteractivo;
