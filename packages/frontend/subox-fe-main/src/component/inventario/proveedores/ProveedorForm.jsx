import React, { useState } from "react";

const ProveedorForm = ({ initialData = {}, onSave, onCancel }) => {
  const [form, setForm] = useState({
    id: initialData.id || null,
    nombre: initialData.nombre || "",
    rut: initialData.rut || "",
    telefono: initialData.telefono || "",
    direccion: initialData.direccion || "",
    confiabilidad: initialData.confiabilidad || "Media",
    tiposRopa: initialData.tiposRopa || [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiSelect = (e) => {
    const selected = Array.from(e.target.selectedOptions).map((o) => o.value);
    setForm((prev) => ({ ...prev, tiposRopa: selected }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
      <input name="rut" placeholder="RUT" value={form.rut} onChange={handleChange} required />
      <input name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} />
      <input name="direccion" placeholder="Dirección" value={form.direccion} onChange={handleChange} />
      <select name="confiabilidad" value={form.confiabilidad} onChange={handleChange}>
        <option value="Alta">Alta</option>
        <option value="Media">Media</option>
        <option value="Baja">Baja</option>
      </select>
      <select multiple value={form.tiposRopa} onChange={handleMultiSelect}>
        <option value="Poleras">Poleras</option>
        <option value="Polerones">Polerones</option>
        <option value="Cortavientos">Cortavientos</option>
        <option value="Camisas">Camisas</option>
        <option value="Vestidos">Vestidos</option>
      </select>
      <button type="submit">Guardar</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  );
};

export default ProveedorForm;