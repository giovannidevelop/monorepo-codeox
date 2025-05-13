import React, { useState, useEffect } from "react";
import styles from "./EditarFardoModal.module.css";

const EditarFardoModal = ({ isOpen, onClose, fardo, onSave }) => {
  const [formData, setFormData] = useState({
    tipoDirecto: "",
    pesoKg: 0,
    precioCompra: 0,
    proveedor: "",
    estadoCompra: ""
  });

  useEffect(() => {
    if (fardo) {
      setFormData({
        tipoDirecto: fardo.tipoDirecto || "",
        pesoKg: fardo.pesoKg || 0,
        precioCompra: fardo.precioCompra || 0,
        proveedor: fardo.proveedor || "",
        estadoCompra: fardo.estadoCompra || ""
      });
    }
  }, [fardo]);

  if (!isOpen || !fardo) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...fardo, ...formData });
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Editar Fardo</h3>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>Tipo:</label>
          <input name="tipoDirecto" value={formData.tipoDirecto} onChange={handleChange} />

          <label>Peso (Kg):</label>
          <input type="number" name="pesoKg" value={formData.pesoKg} onChange={handleChange} />

          <label>Precio Compra:</label>
          <input type="number" name="precioCompra" value={formData.precioCompra} onChange={handleChange} />

          <label>Proveedor:</label>
          <input name="proveedor" value={formData.proveedor} onChange={handleChange} />

          <label>Estado:</label>
          <input name="estadoCompra" value={formData.estadoCompra} onChange={handleChange} />

          <div className={styles.buttons}>
            <button type="submit" className={styles.saveButton}>Guardar</button>
            <button type="button" onClick={onClose} className={styles.cancelButton}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditarFardoModal;
