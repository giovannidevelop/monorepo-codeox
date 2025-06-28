// src/components/Mapa.jsx
import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Configurar íconos por defecto de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Componente que maneja el click en el mapa y muestra el marcador
const MarcadorInteractivo = ({ onUbicacionSeleccionada }) => {
  const [posicion, setPosicion] = useState(null);
  const [direccion, setDireccion] = useState("");

  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      setPosicion({ lat, lng });

      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
      const res = await fetch(url);
      const data = await res.json();
      const address = data.display_name || "Dirección no encontrada";
      setDireccion(address);

      if (onUbicacionSeleccionada) {
        onUbicacionSeleccionada({
          lat,
          lng,
          direccion: address,
          raw: data.address,
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

// Mapa principal
const Mapa = ({ onChange }) => {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MapContainer
        center={[-33.4489, -70.6693]} // Santiago de Chile
        zoom={13}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarcadorInteractivo onUbicacionSeleccionada={onChange} />
      </MapContainer>
    </div>
  );
};

export default Mapa;
