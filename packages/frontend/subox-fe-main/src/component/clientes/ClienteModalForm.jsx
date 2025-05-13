import React, { useState, useEffect, useRef } from "react";
import {
  validarCliente,
  formatearCliente,
  formatearRutParaMostrar,
  validarRutChileno,
} from "./utils/clienteUtils";

const ClienteModalForm = ({ isOpen, onClose, initialData = {}, onSave }) => {
  const initInputRef = useRef(null);
  const overlayRef = useRef(null);
  const mouseDownPos = useRef({ x: 0, y: 0 });

  const [form, setForm] = useState({ nombre: "", rut: "", telefono: "", email: "", direccion: "" });
  const [errores, setErrores] = useState({});
  const [tocado, setTocado] = useState({});
  const resetForm = () => {
    setForm({ nombre: "", rut: "", telefono: "", email: "", direccion: "" });
    setErrores({});
    setTocado({});
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
      setTocado({});

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

  const marcarTocado = (campo) => setTocado((prev) => ({ ...prev, [campo]: true }));

  const validateField = (name, value) => {
    let error = !value.trim() ? `El ${name} es obligatorio.` : undefined;
    if (!error) {
      switch (name) {
        case "rut": {
          const limpio = value.replace(/\./g, "").replace(/-/g, "").toUpperCase();
          if (!validarRutChileno(limpio)) error = "RUT inválido. Ej: 12.345.678-9";
          break;
        }
        case "nombre":
          if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]{2,80}$/.test(value.trim())) error = "Nombre inválido.";
          break;
        case "telefono":
          if (!/^[2-9]\d{7,8}$/.test(value.replace(/\D/g, ""))) error = "Teléfono inválido.";
          break;
        case "email":
          if (!/^\S+@\S+\.\S+$/.test(value.trim())) error = "Correo electrónico inválido.";
          break;
        case "direccion":
          if (!/^[\w\s#ºª.,áéíóúÁÉÍÓÚñÑ\-]{5,100}$/.test(value.trim())) error = "Dirección inválida.";
          break;
        default:
          break;
      }
    }
    setErrores((prev) => ({ ...prev, [name]: error }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    marcarTocado(name);
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const campos = Object.keys(form);
    const nuevosTocados = {};
    campos.forEach((campo) => {
      nuevosTocados[campo] = true;
      validateField(campo, form[campo]);
    });
    setTocado(nuevosTocados);

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

  const handleOverlayClick = (e) => {
    const dist = Math.hypot(e.clientX - mouseDownPos.current.x, e.clientY - mouseDownPos.current.y);
    if (e.target === overlayRef.current && dist < 10) onClose();
  };

  if (!isOpen) return null;

  return (
    <div ref={overlayRef} onMouseDown={(e) => mouseDownPos.current = { x: e.clientX, y: e.clientY }} onClick={handleOverlayClick}
      style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999 }}>
      <div style={{ backgroundColor: "#fff", padding: "2.5rem", borderRadius: "12px", width: "90%", maxWidth: "500px", position: "relative", boxShadow: "0 10px 25px rgba(0,0,0,0.3)" }}>
        <button onClick={onClose} style={{ position: "absolute", top: "10px", right: "10px", background: "transparent", border: "none", fontSize: "1.2rem", cursor: "pointer", color: "#888" }}>✖</button>
        <h2 style={{ fontSize: "1.6rem", textAlign: "center", marginBottom: "1rem" }}>{form.id ? "Editar Cliente" : "Nuevo Cliente"}</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
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
                    padding: "10px",
                    borderRadius: "6px",
                    border: `1px solid ${tocado[campo] && errores[campo] ? "#dc3545" : "#ccc"}`,
                    fontSize: "1rem",
                    width: "100%",
                  }}
                />
                {tocado[campo] && errores[campo] && (
                  <div style={{ color: "#e74c3c", fontSize: "0.85rem", marginTop: "4px", display: "flex", alignItems: "center", gap: "6px" }}>
                    ⚠️ {errores[campo]}
                  </div>
                )}
              </div>
            ))}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1.5rem" }}>
            <button type="submit" style={{ padding: "10px 18px", backgroundColor: "#28a745", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}>Guardar</button>
            <button type="button" onClick={onClose} style={{ padding: "10px 18px", backgroundColor: "#dc3545", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClienteModalForm;
