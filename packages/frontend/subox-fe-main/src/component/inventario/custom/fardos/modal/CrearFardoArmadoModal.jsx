import React, { useState, useEffect } from "react";
import styles from "./CrearFardoArmadoModal.module.css";

const CrearFardoArmadoModal = ({ isOpen, onClose, fardoDirecto, onCrear }) => {
  const [peso, setPeso] = useState("");
  const [calidad, setCalidad] = useState("");
  const [precioVenta, setPrecioVenta] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setPeso("");
      setCalidad("");
      setPrecioVenta("");
      setError("");
    }
  }, [isOpen]);

  if (!isOpen || !fardoDirecto) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const pesoNum = parseFloat(peso);
    const precioNum = parseInt(precioVenta);

    if (!peso || !calidad || !precioVenta) {
      setError("Completa todos los campos.");
      return;
    }

    if (pesoNum > fardoDirecto.pesoKg) {
      setError(`El peso ingresado supera el peso disponible (${fardoDirecto.pesoKg} kg).`);
      return;
    }

    if (pesoNum <= 0) {
      setError("El peso debe ser mayor a 0.");
      return;
    }

    const nuevoArmado = {
      idArmado: Date.now(), // ID único
      pesoFardo: pesoNum,
      calidad,
      precioVenta: precioNum,
      stock: 1,
      fechaArmado: new Date().toISOString() // <-- FECHA AUTOMÁTICA
    };

    onCrear(nuevoArmado, pesoNum);
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Crear Nuevo Fardo Armado</h3>

        <p><strong>Peso disponible:</strong> {fardoDirecto.pesoKg} kg</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <label>Peso del nuevo armado (kg):</label>
          <input
            type="number"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            step="0.1"
            min="0"
            max={fardoDirecto.pesoKg}
          />

          <label>Calidad:</label>
          <input
            type="text"
            value={calidad}
            onChange={(e) => setCalidad(e.target.value)}
          />

          <label>Precio Venta (CLP):</label>
          <input
            type="number"
            value={precioVenta}
            onChange={(e) => setPrecioVenta(e.target.value)}
          />

          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.buttons}>
            <button type="submit" className={styles.createButton}>Crear</button>
            <button type="button" onClick={onClose} className={styles.cancelButton}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearFardoArmadoModal;
