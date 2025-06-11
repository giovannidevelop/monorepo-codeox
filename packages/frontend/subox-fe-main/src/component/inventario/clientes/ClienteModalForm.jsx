import React, { useState, useEffect, useRef } from "react";
import {
  validarCliente,
  formatearCliente,
  formatearRutParaMostrar,
  validarRutChileno,
} from "./utils/clienteUtils";

const ClienteModalForm = ({ isOpen, onClose, initialData = {}, onSave }) => {
  const initInputRef = useRef(null);

  const [form, setForm] = useState({ nombre: "", rut: "", telefono: "", email: "", direccion: "" });
  const [errores, setErrores] = useState({});
  const resetForm = () => {
    setForm({ nombre: "", rut: "", telefono: "", email: "", direccion: "" });
    setErrores({});
  };

  useEffect(() => {
    if (isOpen) {
      setForm(initialData && Object.keys(initialData).length > 0 ? {
        id: initialData.id,
        nombre: initialData.nombre || "",
        rut: formatearRutParaMostrar(initialData.rut || ""),
        telefono: initialData.telefono || "",
        email: initialData.email || "",
        direccion: initialData.direccion || "",
      } : { nombre: "", rut: "", telefono: "", email: "", direccion: "" });

      setErrores({});

      setTimeout(() => {
        initInputRef.current?.select();
        initInputRef.current?.focus();
      }, 0);
    }
  }, [isOpen, initialData]);

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "rut" ? formatearRutParaMostrar(value.replace(/\D/g, "").slice(0, 9)) : value,
    }));
  };

  const validateField = (name, value) => {
  // Asegurarnos de que el valor sea una cadena de texto
  const valueToCheck = String(value).trim(); // Convertimos el valor a string antes de llamar a trim
  let error = !valueToCheck ? `El ${name} es obligatorio.` : undefined;

  if (!error) {
    switch (name) {
      case "rut": {
        const limpio = valueToCheck.replace(/\./g, "").replace(/-/g, "").toUpperCase();
        if (!validarRutChileno(limpio)) error = "RUT inválido. Ej: 12.345.678-9";
        break;
      }
      case "nombre":
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]{2,80}$/.test(valueToCheck)) error = "Nombre inválido.";
        break;
      case "telefono":
        //if (!/^[2-9]\d{7,8}$/.test(valueToCheck.replace(/\D/g, ""))) error = "Teléfono inválido.";
        break;
      case "email":
        //if (!/^\S+@\S+\.\S+$/.test(valueToCheck)) error = "Correo electrónico inválido.";
        break;
      case "direccion":
        if (!/^[\w\s#ºª.,áéíóúÁÉÍÓÚñÑ\-]{5,100}$/.test(valueToCheck)) error = "Dirección inválida.";
        break;
      default:
        break;
    }
  }

  setErrores((prev) => ({ ...prev, [name]: error }));
};

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const campos = Object.keys(form);
    campos.forEach((campo) => {
      validateField(campo, form[campo]);
    });

    const erroresValidados = validarCliente(form);
    if (Object.keys(erroresValidados).length > 0) {
      setErrores((prev) => ({ ...prev, ...erroresValidados }));
      return;
    }

    const clienteFormateado = formatearCliente(form);
    const { id, ...sinId } = clienteFormateado;
    onSave(id ? clienteFormateado : sinId);
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    },
    modal: {
      backgroundColor: "#fff",
      padding: "2.5rem",
      borderRadius: "12px",
      width: "90%",
      maxWidth: "500px",
      position: "relative",
      boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
    },
    closeBtn: {
      position: "absolute",
      top: "10px",
      right: "10px",
      background: "transparent",
      border: "none",
      fontSize: "1.2rem",
      cursor: "pointer",
      color: "#888",
    },
    header: {
      fontSize: "1.6rem",
      textAlign: "center",
      marginBottom: "1rem",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },
    input: {
      padding: "10px",
      borderRadius: "6px",
      border: `1px solid #ccc`,
      fontSize: "1rem",
      width: "100%",
    },
    errorText: {
      color: "#e74c3c",
      fontSize: "0.85rem",
      marginTop: "4px",
      display: "flex",
      alignItems: "center",
      gap: "6px",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "1rem",
      marginTop: "1.5rem",
    },
    button: {
      padding: "10px 18px",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
    },
    saveButton: {
      backgroundColor: "#28a745",
      color: "#fff",
    },
    cancelButton: {
      backgroundColor: "#dc3545",
      color: "#fff",
    },
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div  style={styles.overlay} onClick={(e) => {
          e.stopPropagation();
          handleOverlayClick(e);
        }}>
      <div   style={styles.modal} >
        <button onClick={() => onClose()} style={styles.closeBtn}>✖</button>
        <h2 style={styles.header}>{form.id ? "Editar Cliente" : "Nuevo Cliente"}</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          {Object.keys(form)
            .filter((campo) => campo !== "id")
            .map((campo) => (
              <div key={campo}>
                <input
                  ref={campo === "nombre" ? initInputRef : null}
                  name={campo}
                  placeholder={campo.charAt(0).toUpperCase() + campo.slice(1)}
                  value={form[campo]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  style={{
                    ...styles.input,
                    border: `1px solid ${errores[campo] ? "#dc3545" : "#ccc"}`,
                  }}
                />
                {errores[campo] && (
                  <div style={styles.errorText}>
                    ⚠️ {errores[campo]}
                  </div>
                )}
              </div>
            ))}
          <div style={styles.buttonContainer}>
            <button type="submit" style={{ ...styles.button, ...styles.saveButton }}>Guardar</button>
            <button type="button" onClick={() => onClose()} style={{ ...styles.button, ...styles.cancelButton }}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClienteModalForm;
