import React, { useEffect, useState } from "react";

const HistorialClienteModal = ({ cliente, onClose }) => {
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    fetch("/data/historial-clientes.json")
      .then(res => res.json())
      .then(data => {
        const clienteData = data.find((h) => h.clienteId === cliente.id);
        setHistorial(clienteData?.compras || []);
      });
  }, [cliente]);

  if (!cliente) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 style={styles.title}>🧾 Historial de Compras - {cliente.nombre}</h2>

        {historial.length === 0 ? (
          <p style={styles.empty}>Este cliente no tiene compras registradas.</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Fecha</th>
                <th style={styles.th}>Producto</th>
                <th style={styles.th}>Cantidad</th>
                <th style={styles.th}>Total</th>
              </tr>
            </thead>
            <tbody>
              {historial.map((item, idx) => (
                <tr key={idx}>
                  <td style={styles.td}>{item.fecha}</td>
                  <td style={styles.td}>{item.producto}</td>
                  <td style={styles.td}>{item.cantidad}</td>
                  <td style={styles.td}>{item.total.toLocaleString()} CLP</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <button onClick={onClose} style={styles.closeBtn}>Cerrar</button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  },
  modal: {
    background: "#fff",
    padding: "2rem",
    borderRadius: "12px",
    width: "90%",
    maxWidth: "600px",
    maxHeight: "80vh",
    overflowY: "auto",
    boxShadow: "0 8px 20px rgba(0,0,0,0.3)"
  },
  title: {
    fontSize: "1.4rem",
    marginBottom: "1rem",
    textAlign: "center",
    color: "#333"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "0.95rem"
  },
  th: {
    backgroundColor: "#f1f1f1",
    textAlign: "left",
    padding: "10px",
    borderBottom: "1px solid #ccc"
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #eee"
  },
  closeBtn: {
    marginTop: "1.5rem",
    padding: "10px 16px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    display: "block",
    marginLeft: "auto"
  },
  empty: {
    textAlign: "center",
    color: "#666",
    fontStyle: "italic",
    marginTop: "2rem"
  }
};

export default HistorialClienteModal;
