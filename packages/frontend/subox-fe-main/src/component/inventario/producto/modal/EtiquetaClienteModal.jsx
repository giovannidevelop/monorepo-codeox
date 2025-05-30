import React, { useEffect, useState } from "react";
import logoBase64 from "../utils/resource/logoBase64";
const qrImgPath = "/resourse/img/qr_instagram.png";

const EtiquetaClienteModal = ({ cliente, onClose }) => {
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    const escListener = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", escListener);
    return () => window.removeEventListener("keydown", escListener);
  }, [onClose]);

  const handlePrint = () => {
    const win = window.open("", "Etiqueta", "width=800,height=600");
    if (!win) return;

    const etiquetasHTML = Array.from({ length: cantidad }, () => `
      <div class="etiqueta">
        <div class="etiqueta-contenido">
          <img src="${logoBase64}" class="logo" alt="Logo" />
          <div class="datos">
            <div class="campo"><strong>Nombre:</strong> ${cliente.nombre}</div>
            <div class="campo"><strong>Dirección:</strong> ${cliente.direccion}</div>
            <div class="campo"><strong>Teléfono:</strong> ${cliente.telefono}</div>
            <div class="campo"><strong>RUT:</strong> ${cliente.rut}</div>
          </div>
          <img src="${qrImgPath}" class="qr" alt="QR Instagram" />
        </div>
      </div>
    `).join("");

    const html = `
      <html>
        <head>
          <style>
            @page { size: 216mm 279mm; margin: 0; }
            body { margin: 0; padding: 0; font-family: Arial, sans-serif; }
            .etiqueta {
              width: 100%;
              height: 139.5mm;
              padding: 15mm;
              border-bottom: 1px dashed #000;
              display: flex;
              justify-content: center;
              align-items: center;
              box-sizing: border-box;
            }
            .etiqueta:last-child { border-bottom: none; }
            .etiqueta-contenido {
              display: flex;
              align-items: center;
              width: 100%;
              justify-content: space-between;
            }
            .logo {
              max-height: 70px;
              margin-right: 2rem;
            }
            .qr {
              max-height: 100px;
              margin-left: 2rem;
            }
            .datos {
              flex-grow: 1;
              font-size: 1.6rem;
            }
            .campo {
              margin: 10px 0;
              font-size: 1.8rem;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          ${etiquetasHTML}
          <script>
            setTimeout(() => window.print(), 400);
          </script>
        </body>
      </html>
    `;
    win.document.write(html);
    win.document.close();
  };

  if (!cliente) return null;

  return (
    <div
      onClick={() => onClose()}
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          padding: "2rem",
          borderRadius: "10px",
          maxWidth: "700px",
          width: "95%",
          boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
          textAlign: "center"
        }}
      >
        <h2 style={{ marginBottom: "1rem", color: "#007bff" }}>Vista previa de la etiqueta</h2>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ fontWeight: "bold", marginRight: "0.5rem" }}>Cantidad:</label>
          <input
            type="number"
            min={1}
            value={cantidad}
            onChange={(e) => setCantidad(Math.max(1, parseInt(e.target.value)))}
            style={{
              padding: "8px",
              width: "60px",
              fontSize: "1rem",
              textAlign: "center",
              borderRadius: "6px",
              border: "1px solid #ccc"
            }}
          />
        </div>

        <div style={{
          border: "1px dashed #ccc",
          padding: "1.5rem",
          marginBottom: "1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <img src={logoBase64} alt="logo" style={{ maxHeight: "70px", marginRight: "2rem" }} />
          <div style={{ flexGrow: 1, textAlign: "left", fontSize: "1.4rem" }}>
            <p><strong>Nombre:</strong> {cliente.nombre}</p>
            <p><strong>Dirección:</strong> {cliente.direccion}</p>
            <p><strong>Teléfono:</strong> {cliente.telefono}</p>
            <p><strong>RUT:</strong> {cliente.rut}</p>
          </div>
          <img src={qrImgPath} alt="qr" style={{ maxHeight: "100px", marginLeft: "2rem" }} />
        </div>

        <button
          onClick={handlePrint}
          style={{
            padding: "10px 18px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            marginRight: "1rem",
            cursor: "pointer"
          }}
        >
          🖨️ Imprimir
        </button>
        <button
          onClick={() => {
            onClose();
          }}
          style={{
            padding: "10px 18px",
            backgroundColor: "#dc3545",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default EtiquetaClienteModal;
