import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

const FardoMenu = ({
  isOpen,
  onClose,
  onEdit,
  onCrearArmado,
  triggerRef,
  onVender
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
    <button style={styles.item} onClick={onEdit}
      onMouseEnter={(e) => e.target.style.backgroundColor = "#f5f5f5"}
      onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
      >✏️ Editar</button>

    <button style={styles.item} onClick={onCrearArmado}
      onMouseEnter={(e) => e.target.style.backgroundColor = "#f5f5f5"}
      onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
      >📦 Crear Armado</button>
      <button style={styles.item} onClick={onVender} 
            onMouseEnter={(e) => e.target.style.backgroundColor = "#f5f5f5"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
      >💵 Vender Fardo</button>
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
      borderBottom: "1px solid #eee",
      transition: "background-color 0.2s", /* transición suave */
    }
  };
  
export default FardoMenu;
