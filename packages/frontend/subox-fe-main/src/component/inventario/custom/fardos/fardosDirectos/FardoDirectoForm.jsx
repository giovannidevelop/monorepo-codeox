import React, { useState, useEffect } from "react";

const FardoDirectoForm = ({ initialData, onSave, onCancel }) => {
  const [form, setForm] = useState({
    tipoDirecto: "",
    pesoKg: 45,
    precioCompra: 0,
    fechaCompra: "",
    origen: "Estación Central",
    detalleContenido: [],
    cantidad: 1
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Tipo Directo:</label>
      <input name="tipoDirecto" value={form.tipoDirecto} onChange={handleChange} required />

      <label>Peso (Kg):</label>
      <input name="pesoKg" type="number" value={form.pesoKg} onChange={handleChange} required />

      <label>Precio Compra:</label>
      <input name="precioCompra" type="number" value={form.precioCompra} onChange={handleChange} required />

      <label>Fecha Compra:</label>
      <input name="fechaCompra" type="date" value={form.fechaCompra} onChange={handleChange} required />

      <label>Origen:</label>
      <input name="origen" value={form.origen} onChange={handleChange} />

      <label>Cantidad:</label>
      <input name="cantidad" type="number" value={form.cantidad} onChange={handleChange} required />

      <button type="submit">Guardar</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  );
};

export default FardoDirectoForm;