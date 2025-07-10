    import React, { useState, useRef } from "react";
    import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
    import MarcadorInteractivo from "./MarcadorInteractivo";
    import BuscadorDireccion from "./BuscadorDireccion";
    import L from "leaflet";
    import "leaflet/dist/leaflet.css";

    // Configurar íconos por defecto
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    });

    const MapaContainer = ({ onChange }) => {
    const [coordenadasBusqueda, setCoordenadasBusqueda] = useState(null);

    const MapaConBusqueda = () => {
        const map = useMap();

        if (coordenadasBusqueda) {
        map.setView([coordenadasBusqueda.lat, coordenadasBusqueda.lng], 16);
        }

        return coordenadasBusqueda ? (
        <Marker position={[coordenadasBusqueda.lat, coordenadasBusqueda.lng]}>
            <Popup>{coordenadasBusqueda.direccion}</Popup>
        </Marker>
        ) : null;
    };

    return (
        <div>
        <BuscadorDireccion onBuscar={(result) => {
            setCoordenadasBusqueda(result);
            onChange?.(result);
        }} />

        <div style={{ height: "400px", width: "100%" }}>
            <MapContainer
            center={[-33.4489, -70.6693]} // Santiago
            zoom={13}
            style={{ height: "70%", width: "100%" }}
            >
            <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapaConBusqueda />
            <MarcadorInteractivo onUbicacionSeleccionada={onChange} />
            </MapContainer>
        </div>
        </div>
    );
    };

    export default MapaContainer;
