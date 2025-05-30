import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

const ClienteMenuModal = ({
  isOpen,
  onToggle,
  onClose,
  onEdit,
  onDelete,
  onHistorial,
  onEtiqueta,
  triggerRef
}) => {
  const menuRef = useRef();
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  useEffect(() => {
    if (isOpen && triggerRef?.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const spaceRight = window.innerWidth - rect.right;
      const spaceBottom = window.innerHeight - rect.bottom;
      const alignLeft = spaceRight < 180;
      const alignUp = spaceBottom < 160;

      setPosition({
        top: alignUp ? rect.bottom + window.scrollY - 120 : rect.bottom + window.scrollY,
        left: alignLeft ? rect.right - 160 : rect.left
      });
    }
  }, [isOpen, triggerRef]);

  if (!isOpen) return null;

  const menu = (
    <div
      ref={menuRef}
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
        backgroundColor: "#fff",
        boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.2)",
        borderRadius: "8px",
        zIndex: 9999,
        minWidth: "160px",
        overflow: "hidden"
      }}
    >
      <button style={styles.item} onClick={onEdit}>✏️ Editar</button>
      <button style={styles.item} onClick={onDelete}>🗑️ Eliminar</button>
      <button style={styles.item} onClick={onHistorial}>📜 Historial</button>
      <button style={styles.item} onClick={onEtiqueta}>🏷️ Etiqueta</button>
    </div>
  );

  return ReactDOM.createPortal(menu, document.body);
};

const styles = {
  item: {
    display: "block",
    padding: "10px 14px",
    width: "100%",
    border: "none",
    background: "none",
    textAlign: "left",
    cursor: "pointer",
    fontSize: "0.9rem",
    borderBottom: "1px solid #eee"
  }
};

export default ClienteMenuModal;
