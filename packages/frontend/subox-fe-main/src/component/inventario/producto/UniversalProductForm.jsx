import React, { useState } from "react";

const TYPES = ["PHYSICAL", "SERVICE", "DIGITAL", "COMPOSITE", "VEHICLE"];

const UniversalProductForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    type: "PHYSICAL",
    name: "",
    barcode: "",
    description: "",
    pricing: [{ listId: "retail", price: "", currency: "CLP" }],
    ...initialData,
  });

  const setField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
      <label>
        Tipo:
        <select
          value={form.type}
          onChange={(e) => setField("type", e.target.value)}
        >
          {TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>

      <label>
        Nombre:
        <input
          value={form.name}
          onChange={(e) => setField("name", e.target.value)}
        />
      </label>

      <label>
        Código de barras:
        <input
          value={form.barcode}
          onChange={(e) => setField("barcode", e.target.value)}
        />
      </label>

      <label>
        Descripción:
        <textarea
          value={form.description}
          onChange={(e) => setField("description", e.target.value)}
        />
      </label>

      <label>
        Precio (retail):
        <input
          type="number"
          value={form.pricing[0].price}
          onChange={(e) =>
            setField("pricing", [
              { ...form.pricing[0], price: Number(e.target.value) },
            ])
          }
        />
      </label>

      <div style={{ display: "flex", gap: "1rem" }}>
        <button type="submit">Guardar</button>
        <button type="button" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default UniversalProductForm;
