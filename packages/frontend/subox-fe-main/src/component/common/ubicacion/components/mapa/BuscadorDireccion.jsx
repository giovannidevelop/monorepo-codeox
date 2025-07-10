import React, { useState } from "react";

const BuscadorDireccion = ({ onBuscar }) => {
  const [input, setInput] = useState("");

  const buscar = async () => {
    const query = input.toLowerCase().includes("chile")
      ? input
      : `${input}, Chile`;

    const url = `https://nominatim.openstreetmap.org/search?format=json&countrycodes=cl&q=${encodeURIComponent(query)}`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.length > 0) {
      const resultado = data[0];
      const lat = parseFloat(resultado.lat);
      const lng = parseFloat(resultado.lon);
      const direccion = resultado.display_name;

      onBuscar({
        lat,
        lng,
        direccion,
        raw: resultado,
      });
    } else {
      alert("No se encontró una dirección válida en Chile.");
    }
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <input
        type="text"
        placeholder="Ej: Av. Apoquindo 4500"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ padding: "6px", width: "70%" }}
      />
      <button onClick={buscar} style={{ marginLeft: "8px", padding: "6px" }}>
        Buscar
      </button>
    </div>
  );
};

export default BuscadorDireccion;
