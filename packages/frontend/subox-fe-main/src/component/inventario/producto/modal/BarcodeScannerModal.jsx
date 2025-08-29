import React, { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";

const BarcodeScannerModal = ({ isOpen, onClose, onDetected }) => {
  const videoRef = useRef(null);
  const readerRef = useRef(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const reader = new BrowserMultiFormatReader();
    readerRef.current = reader;

    const start = async () => {
      try {
        const devices = await BrowserMultiFormatReader.listVideoInputDevices();
        const backCamera =
          devices.find((d) => /back|rear|environment/i.test(d.label)) || devices[0];

        await reader.decodeFromVideoDevice(
          backCamera?.deviceId ?? null,
          videoRef.current,
          (result, err) => {
            if (result?.getText) {
              const code = result.getText().trim();
              if (code) {
                onDetected?.(code);
                onClose?.();
              }
            } else if (err) {
              // Ignorar frames sin decode
            }
          }
        );
      } catch (e) {
        console.error(e);
        setError("No se pudo acceder a la cámara. Revisa permisos o HTTPS.");
      }
    };

    start();

    return () => {
      try {
        readerRef.current?.reset();
      } catch {}
    };
  }, [isOpen, onClose, onDetected]);

  if (!isOpen) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h3 style={{ margin: 0, fontSize: "1rem" }}>Escanear código</h3>
          <button style={styles.close} onClick={onClose}>×</button>
        </div>

        <div style={styles.videoWrap}>
          <video ref={videoRef} style={styles.video} muted autoPlay playsInline />
          <div style={styles.frame}/>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <div style={styles.tip}>
          Apunta la cámara al EAN/UPC. La luz ayuda 😉
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,.35)",
    display: "grid", placeItems: "center", zIndex: 1000 },
  modal: { width: "min(520px, 92vw)", background: "#fff", borderRadius: 12,
    boxShadow: "0 10px 30px rgba(0,0,0,.25)", overflow: "hidden" },
  header: { display: "flex", justifyContent: "space-between",
    alignItems: "center", padding: "10px 12px", borderBottom: "1px solid #eee" },
  close: { background: "transparent", border: "none", fontSize: 20, cursor: "pointer" },
  videoWrap: { position: "relative", padding: 12, background: "#000" },
  video: { width: "100%", borderRadius: 8, objectFit: "cover" },
  frame: {
    position: "absolute", inset: 12, borderRadius: 8, pointerEvents: "none",
    boxShadow: "0 0 0 9999px rgba(0,0,0,.35)",
    border: "2px solid rgba(255,255,255,.55)"
  },
  error: { color: "#b91c1c", padding: "10px 12px" },
  tip: { padding: "8px 12px 12px", color: "#475569", fontSize: ".9rem" },
};

export default BarcodeScannerModal;
