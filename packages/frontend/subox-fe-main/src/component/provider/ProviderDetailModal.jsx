import React from "react";
import styles from "./ProviderDetailModal.module.css";

export default function ProviderDetailModal({ proveedor, onClose }) {
  if (!proveedor) return null;
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        <h2>{proveedor.nombre}</h2>
        <p><b>RUT:</b> {proveedor.rut}</p>
        <p><b>Teléfono:</b> {proveedor.telefono}</p>
        <p><b>Dirección:</b> {proveedor.direccion}</p>
        <p><b>Confiabilidad:</b> <span className={styles[proveedor.confiabilidad.toLowerCase()]}>{proveedor.confiabilidad}</span></p>
        <p><b>Tipos de ropa:</b> {proveedor.tiposRopa && proveedor.tiposRopa.map(t => <span key={t} className={styles.chip}>{t}</span>)}</p>
        <button className={styles.closeBtn} onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}
