
import React from "react";
import styles from "./FardosArmadosModal.module.css";

const FardosArmadosModal = ({ isOpen, onClose, fardos }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Fardos Armados Relacionados</h3>
        <button onClick={onClose} className={styles.closeButton}>Cerrar</button>
        <ul>
          {fardos.length > 0 ? (
            fardos.map((f) => (
              <li key={f.id}>
                <strong>ID:</strong> {f.id} | <strong>Tipo:</strong> {f.tipo} | <strong>Peso:</strong> {f.pesoFardo} Kg
              </li>
            ))
          ) : (
            <p>No hay fardos armados para este fardo directo.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default FardosArmadosModal;
