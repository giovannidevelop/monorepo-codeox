import React, { useState, useEffect } from "react";
import styles from "./ProviderFormModal.module.css";
import { addProveedor, updateProveedor } from "./providerService";

const initialState = {
  nombre: "",
  rut: "",
  telefono: "",
  direccion: "",
  confiabilidad: "Media",
  tiposRopa: [],
};

const tiposDisponibles = ["Poleras", "Polerones", "Cortavientos", "Vestidos", "Camisas", "Pantalones"];

export default function ProviderFormModal({ initialData, onClose }) {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleCheckTipo = tipo => {
    setForm(f => ({
      ...f,
      tiposRopa: f.tiposRopa.includes(tipo)
        ? f.tiposRopa.filter(t => t !== tipo)
        : [...f.tiposRopa, tipo]
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (form.nombre.trim() === "") return alert("Nombre es requerido");
    if (form.rut.trim() === "") return alert("RUT es requerido");
    if (form.telefono.trim() === "") return alert("Teléfono es requerido");

    if (form.id) await updateProveedor(form.id, form);
    else await addProveedor(form);

    onClose();
  };

  return (
    <div className={styles.modalBackdrop}>
      <form className={styles.modal} onSubmit={handleSubmit}>
        <h2>{form.id ? "Editar Proveedor" : "Agregar Proveedor"}</h2>
        <label>
          Nombre
          <input name="nombre" value={form.nombre} onChange={handleChange} required />
        </label>
        <label>
          RUT
          <input name="rut" value={form.rut} onChange={handleChange} required />
        </label>
        <label>
          Teléfono
          <input name="telefono" value={form.telefono} onChange={handleChange} required />
        </label>
        <label>
          Dirección
          <input name="direccion" value={form.direccion} onChange={handleChange} />
        </label>
        <label>
          Confiabilidad
          <select name="confiabilidad" value={form.confiabilidad} onChange={handleChange}>
            <option value="Alta">Alta</option>
            <option value="Media">Media</option>
            <option value="Baja">Baja</option>
          </select>
        </label>
        <label>
          Tipos de Ropa
          <div className={styles.tiposRopaGroup}>
            {tiposDisponibles.map(tipo => (
              <label key={tipo} className={styles.tipoCheck}>
                <input
                  type="checkbox"
                  checked={form.tiposRopa.includes(tipo)}
                  onChange={() => handleCheckTipo(tipo)}
                />
                {tipo}
              </label>
            ))}
          </div>
        </label>
        <div className={styles.actions}>
          <button type="submit" className={styles.submitBtn}>Guardar</button>
          <button type="button" onClick={onClose} className={styles.cancelBtn}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}
