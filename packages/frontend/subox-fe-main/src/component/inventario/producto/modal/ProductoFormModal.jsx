import React, { useState, useEffect, useRef } from "react";
import { CatalogoApi } from "../api/productos";
import BarcodeScannerModal from "./BarcodeScannerModal";
import { isValidEAN13 } from "../utils/barcode";

/**
 * ProductoFormModal
 * Steps:
 * 1) Datos
 * 2) Precio / Stock
 * 3) Clasificación
 * 4) Imágenes & Preview
 */
const ProductoFormModal = ({ isOpen, onClose, initialData = {}, onSave }) => {
  const fileInputRef = useRef(null);

  const [step, setStep] = useState(1);
  const [showPreview, setShowPreview] = useState(false); // oculto por defecto al crear, visible al editar

  // Form
  const [form, setForm] = useState({
    id: null,
    codigoBarras: "",
    nombre: "",
    descripcion: "",
    precioCompra: "",
    precioVenta: "",
    stock: "",
    fechaIngreso: new Date().toISOString().slice(0, 10), // 👈 se enviará oculta
    categoria: null,
    marca: null,
    calidad: null,
    estadoProducto: null,
    imagenes: [],        // dataURLs para preview (multi)
    _imagenFiles: [],    // Blobs/Files comprimidos para subir
  });

  // Catálogos
  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [calidades, setCalidades] = useState([]);
  const [estados, setEstados] = useState([]);

  // Scanner
  const [scanOpen, setScanOpen] = useState(false);
  const [barcodeError, setBarcodeError] = useState("");

  // Cargar catálogos
  useEffect(() => {
    const fetchCatalogos = async () => {
      try {
        const [cats, marks, cals, stats] = await Promise.all([
          CatalogoApi.categorias.list(),
          CatalogoApi.marcas.list(),
          CatalogoApi.calidades.list(),
          CatalogoApi.estados.list(),
        ]);
        setCategorias(cats || []);
        setMarcas(marks || []);
        setCalidades(cals || []);
        setEstados(stats || []);
      } catch (err) {
        console.error("Error cargando catálogos", err);
      }
    };
    if (isOpen) fetchCatalogos();
  }, [isOpen]);

  // Inicializar datos al abrir
  useEffect(() => {
    if (!isOpen) return;
    setStep(1);
    setShowPreview(!!initialData?.id); // 👈 solo mostrar preview por defecto si es edición
    setBarcodeError("");

    setForm({
      id: initialData.id ?? null,
      codigoBarras: initialData.codigoBarras ?? "",
      nombre: initialData.nombre ?? "",
      descripcion: initialData.descripcion ?? "",
      precioCompra: initialData.precioCompra ?? "",
      precioVenta: initialData.precioVenta ?? "",
      stock: initialData.stock ?? "",
      // 👇 fecha: si es nuevo => hoy; si edita => conserva la existente
      fechaIngreso:
        initialData.id && initialData.fechaIngreso
          ? initialData.fechaIngreso
          : new Date().toISOString().slice(0, 10),
      categoria: initialData.categoria ?? null,
      marca: initialData.marca ?? null,
      calidad: initialData.calidad ?? null,
      estadoProducto: initialData.estadoProducto ?? null,
      imagenes: Array.isArray(initialData.imagenes)
        ? initialData.imagenes
        : (initialData.imagen ? [initialData.imagen] : []),
      _imagenFiles: [],
    });
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  /* =========================
     Helpers UI
     ========================= */
  const next = () => setStep((s) => Math.min(4, s + 1));
  const prev = () => setStep((s) => Math.max(1, s - 1));

  // 👇 Navegación segura: nunca dispara submit
  const handleNext = (e) => {
    e.preventDefault();
    next();
  };
  const handlePrev = (e) => {
    e.preventDefault();
    prev();
  };

  const preventEnterSubmit = (e) => {
    // evita que ENTER envíe el formulario en cualquier paso (excepto textarea)
    if (e.key === "Enter" && e.target?.tagName !== "TEXTAREA") {
      e.preventDefault();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectObj = (e, list) => {
    const { name, value } = e.target;
    const obj = list.find((item) => String(item.id) === String(value)) || null;
    setForm((prev) => ({ ...prev, [name]: obj }));
  };

  /* =========================
     Códigos de barras
     ========================= */
  const handleGenerateBarcode = () => {
    const code = randomEAN13();
    setForm((prev) => ({ ...prev, codigoBarras: code }));
    setBarcodeError("");
  };

  function randomEAN13() {
    // Genera 12 dígitos aleatorios (evitamos empezar con 0 para que luzca “real”)
    const base = [Math.floor(Math.random() * 9) + 1]
      .concat(Array.from({ length: 11 }, () => Math.floor(Math.random() * 10)));
    const check = ean13Checksum(base);
    return base.join("") + check;
  }
  function ean13Checksum(digs12) {
    // suma impares + 3*suma pares (posición 1 = índice 0)
    let sum = 0;
    digs12.forEach((d, i) => {
      sum += i % 2 === 0 ? d : d * 3;
    });
    const mod = sum % 10;
    return mod === 0 ? 0 : 10 - mod;
  }

  /* =========================
     Imágenes (multi + compresión)
     ========================= */
  const handleOpenFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleImageSelect = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const newImgs = [];
    const newFiles = [];

    for (const file of files) {
      const result = await compressImage(file, { maxWidth: 1280, maxBytes: 1_200_000 });
      if (result) {
        newImgs.push(result.dataURL);
        newFiles.push(result.blob);
      }
    }

    setForm((prev) => ({
      ...prev,
      imagenes: [...prev.imagenes, ...newImgs],
      _imagenFiles: [...prev._imagenFiles, ...newFiles],
    }));

    // resetea para permitir volver a elegir los mismos archivos si se desea
    e.target.value = "";
  };

  const handleRemoveImage = (idx) => {
    setForm((prev) => ({
      ...prev,
      imagenes: prev.imagenes.filter((_, i) => i !== idx),
      _imagenFiles: prev._imagenFiles.filter((_, i) => i !== idx),
    }));
  };

  /* =========================
     Submit
     ========================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.codigoBarras && !isValidEAN13(form.codigoBarras)) {
      setBarcodeError("Código EAN-13 inválido");
      setStep(1);
      return;
    }

    onSave(form);
  };

  return (
    // 👇 Sin onClick en overlay para evitar cierres inesperados
    <div style={styles.overlay} role="dialog" aria-modal="true">
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={styles.header}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <h3 style={{ margin: 0, fontSize: "1rem" }}>
              {form.id ? "Editar producto" : "Nuevo producto"}
            </h3>
            <button
              type="button"
              className="pfm-btn pfm-btn--muted pfm-btn--pill"
              onClick={() => setShowPreview((v) => !v)}
              title={showPreview ? "Ocultar preview" : "Mostrar preview"}
            >
              {showPreview ? "👁️ Ocultar preview" : "👁️ Mostrar preview"}
            </button>
          </div>
          <button type="button" style={styles.close} onClick={onClose} aria-label="Cerrar">×</button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} onKeyDown={preventEnterSubmit}>
          <div
            style={{
              ...styles.content,
              gridTemplateColumns: showPreview ? "360px 1fr" : "1fr",
            }}
            className="pfm-modal-content"
          >
            {/* Aside Preview */}
            {showPreview && (
              <aside style={styles.aside}>
                <div style={styles.card}>
                  <div style={{ display: "flex", gap: 10 }}>
                    <img
                      src={form.imagenes[0] || "https://via.placeholder.com/120?text=No+Image"}
                      alt={form.nombre || "Preview"}
                      style={{ width: 120, height: 120, objectFit: "cover", borderRadius: 8 }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={styles.previewName}>
                        {form.nombre || "Nombre del producto"}
                      </div>
                      <div style={styles.previewBrand}>
                        {form.marca?.nombre || "Marca"} · {form.categoria?.nombre || "Categoría"}
                      </div>
                      <div style={styles.previewPrice}>
                        {form.precioVenta
                          ? `$${Number(form.precioVenta).toLocaleString()}`
                          : "$0"}
                      </div>
                      <div style={styles.previewMuted}>Stock: {form.stock || 0}</div>
                    </div>
                  </div>

                  {form.descripcion ? (
                    <div style={{ marginTop: 10, fontSize: ".9rem", color: "#475569" }}>
                      {form.descripcion}
                    </div>
                  ) : (
                    <div style={{ marginTop: 10, fontSize: ".9rem", color: "#94a3b8" }}>
                      Descripción breve del producto…
                    </div>
                  )}
                </div>
              </aside>
            )}

            {/* Main Steps */}
            <main style={styles.main}>
              {/* Paso 1: Datos */}
              {step === 1 && (
                <div style={styles.groupRows}>
                  {/* Código de barras */}
                  <div className="pfm-row">
                    <label className="pfm-label">Código de barras</label>
                    <div className="pfm-inline">
                      <input
                        className="pfm-input"
                        type="text"
                        name="codigoBarras"
                        value={form.codigoBarras}
                        onChange={(e) => {
                          setBarcodeError("");
                          handleChange(e);
                        }}
                        onBlur={() => {
                          if (form.codigoBarras && !isValidEAN13(form.codigoBarras)) {
                            setBarcodeError("Código EAN-13 inválido");
                          }
                        }}
                        placeholder="Ej. 7801234567890"
                      />
                      <button
                        type="button"
                        className="pfm-btn pfm-btn--muted"
                        onClick={() => setScanOpen(true)}
                      >
                        📷 Escanear
                      </button>
                    </div>
                  </div>
                  {/* Generar código (para productos sin código) */}
                  <div className="pfm-row">
                    <label className="pfm-label" />
                    <div className="pfm-inline" style={{ gridTemplateColumns: "auto 1fr" }}>
                      <button
                        type="button"
                        className="pfm-btn pfm-btn--primary"
                        onClick={handleGenerateBarcode}
                      >
                        🔧 Generar EAN-13
                      </button>
                      <div className="pfm-hint">
                        Útil para ropa u otros sin código de fábrica. Se genera un EAN-13 válido y único localmente.
                      </div>
                    </div>
                  </div>

                  {/* Nombre */}
                  <div className="pfm-row">
                    <label className="pfm-label">Nombre</label>
                    <input
                      className="pfm-input"
                      type="text"
                      name="nombre"
                      value={form.nombre}
                      onChange={handleChange}
                      placeholder="Ej. Camiseta básica"
                    />
                  </div>

                  {/* Descripción */}
                  <div className="pfm-row pfm-row--stack">
                    <label className="pfm-label">Descripción</label>
                    <textarea
                      className="pfm-textarea"
                      name="descripcion"
                      value={form.descripcion}
                      onChange={handleChange}
                      placeholder="Detalles, materiales, cuidados…"
                    />
                  </div>

                  {/* Fecha oculta viaja en form */}
                  {barcodeError && (
                    <div className="pfm-row">
                      <label className="pfm-label" />
                      <div className="pfm-error">{barcodeError}</div>
                    </div>
                  )}
                </div>
              )}

              {/* Paso 2: Precio/Stock */}
              {step === 2 && (
                <div style={styles.groupRows}>
                  <div className="pfm-row">
                    <label className="pfm-label">Precio compra</label>
                    <input
                      className="pfm-input"
                      type="number"
                      name="precioCompra"
                      value={form.precioCompra}
                      onChange={handleChange}
                      placeholder="0"
                    />
                  </div>
                  <div className="pfm-row">
                    <label className="pfm-label">Precio venta</label>
                    <input
                      className="pfm-input"
                      type="number"
                      name="precioVenta"
                      value={form.precioVenta}
                      onChange={handleChange}
                      placeholder="0"
                    />
                  </div>
                  <div className="pfm-row">
                    <label className="pfm-label">Stock</label>
                    <input
                      className="pfm-input"
                      type="number"
                      name="stock"
                      value={form.stock}
                      onChange={handleChange}
                      placeholder="0"
                    />
                  </div>
                </div>
              )}

              {/* Paso 3: Clasificación */}
              {step === 3 && (
                <div style={styles.groupRows}>
                  <div className="pfm-row">
                    <label className="pfm-label">Categoría</label>
                    <select
                      className="pfm-input"
                      name="categoria"
                      value={form.categoria?.id || ""}
                      onChange={(e) => handleSelectObj(e, categorias)}
                    >
                      <option value="">Selecciona categoría</option>
                      {categorias.map((c) => (
                        <option key={c.id} value={c.id}>{c.nombre}</option>
                      ))}
                    </select>
                  </div>
                  <div className="pfm-row">
                    <label className="pfm-label">Marca</label>
                    <select
                      className="pfm-input"
                      name="marca"
                      value={form.marca?.id || ""}
                      onChange={(e) => handleSelectObj(e, marcas)}
                    >
                      <option value="">Selecciona marca</option>
                      {marcas.map((m) => (
                        <option key={m.id} value={m.id}>{m.nombre}</option>
                      ))}
                    </select>
                  </div>
                  <div className="pfm-row">
                    <label className="pfm-label">Calidad</label>
                    <select
                      className="pfm-input"
                      name="calidad"
                      value={form.calidad?.id || ""}
                      onChange={(e) => handleSelectObj(e, calidades)}
                    >
                      <option value="">Selecciona calidad</option>
                      {calidades.map((c) => (
                        <option key={c.id} value={c.id}>{c.nombre}</option>
                      ))}
                    </select>
                  </div>
                  <div className="pfm-row">
                    <label className="pfm-label">Estado</label>
                    <select
                      className="pfm-input"
                      name="estadoProducto"
                      value={form.estadoProducto?.id || ""}
                      onChange={(e) => handleSelectObj(e, estados)}
                    >
                      <option value="">Selecciona estado</option>
                      {estados.map((eP) => (
                        <option key={eP.id} value={eP.id}>{eP.estado}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Paso 4: Imágenes & Preview */}
              {step === 4 && (
                <div style={{ display: "grid", gap: 12 }}>
                  <div className="pfm-row pfm-row--stack">
                    <label className="pfm-label">Imágenes</label>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <button
                        type="button"
                        className="pfm-btn pfm-btn--primary"
                        onClick={handleOpenFilePicker}
                      >
                        ➕ Añadir imágenes
                      </button>
                      <span className="pfm-hint">
                        Puedes subir varias a la vez. Se comprimen automáticamente (~1.2 MB máx/imagen).
                      </span>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageSelect}
                      style={{ display: "none" }}
                    />

                    <div className="pfm-thumbs">
                      {form.imagenes.length ? (
                        form.imagenes.map((src, idx) => (
                          <div key={idx} className="pfm-thumb">
                            <img src={src} alt={`Imagen ${idx + 1}`} />
                            <button type="button" onClick={() => handleRemoveImage(idx)}>❌</button>
                          </div>
                        ))
                      ) : (
                        <div className="pfm-empty">
                          <div className="pfm-empty-icon">🖼️</div>
                          <div className="pfm-empty-text">
                            Aún no has agregado imágenes.
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pfm-note">
                      Consejo: la primera imagen será la principal en el preview.
                    </div>
                  </div>
                </div>
              )}

              {/* Navegación */}
              <div style={styles.footer}>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={step === 1}
                    className="pfm-btn pfm-btn--muted"
                  >
                    ← Atrás
                  </button>
                  {step < 4 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="pfm-btn pfm-btn--primary"
                    >
                      Siguiente →
                    </button>
                  ) : (
                    <button type="submit" className="pfm-btn pfm-btn--success">
                      Guardar
                    </button>
                  )}
                </div>
                <button type="button" onClick={onClose} className="pfm-btn pfm-btn--danger">
                  Cancelar
                </button>
              </div>
            </main>
          </div>
        </form>

        {/* Modal del escáner */}
        <BarcodeScannerModal
          isOpen={scanOpen}
          onClose={() => setScanOpen(false)}
          onDetected={(code) => {
            setForm((prev) => ({ ...prev, codigoBarras: code }));
            setBarcodeError(isValidEAN13(code) ? "" : "Código EAN-13 inválido");
          }}
        />
      </div>
    </div>
  );
};

/* =========================
   Styles
   ========================= */
const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,.35)",
    display: "grid",
    placeItems: "center",
    zIndex: 1000,
    padding: "12px",
  },
  modal: {
    width: "min(1100px, 92vw)",
    maxHeight: "92vh",
    background: "#fff",
    borderRadius: 14,
    boxShadow: "0 10px 30px rgba(0,0,0,.25)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 14px",
    borderBottom: "1px solid #eee",
  },
  close: { background: "transparent", border: "none", fontSize: 22, cursor: "pointer" },
  content: {
    display: "grid",
    gap: 16,
    padding: 16,
    overflow: "auto",
  },
  aside: { minWidth: 0 },
  card: {
    border: "1px solid #e5e7eb",
    borderRadius: 10,
    padding: 12,
    background: "#fafafa",
  },
  previewName: { fontWeight: 700, fontSize: "1rem", lineHeight: 1.2 },
  previewBrand: { color: "#64748b", fontSize: ".9rem", marginTop: 2 },
  previewPrice: { fontWeight: 700, marginTop: 6 },
  previewMuted: { color: "#94a3b8", fontSize: ".85rem" },
  main: { minWidth: 0, border: "1px solid #e5e7eb", borderRadius: 10, padding: 12 },
  groupRows: { display: "grid", gap: 10 },
  footer: { marginTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center" },
};

const injectedCSS = `
/* Filas grupo: label + control */
.pfm-row{
  display:grid;
  grid-template-columns: 160px 1fr;
  gap:12px;
  align-items:center;
}
.pfm-row--stack{
  grid-template-columns: 160px 1fr;
  align-items:start;
}

.pfm-label{font-size:.78rem;color:#475569;font-weight:700}

/* Inputs */
.pfm-input,.pfm-textarea,select{
  border:1px solid #cbd5e1;border-radius:10px;padding:10px;font-size:.95rem;outline:none;background:#fff;
}
.pfm-textarea{min-height:96px;resize:vertical}
.pfm-input:focus,.pfm-textarea:focus,select:focus{border-color:#3b82f6;box-shadow:0 0 0 3px rgba(59,130,246,.12)}
.pfm-inline{display:grid;grid-template-columns:1fr auto;gap:8px}
.pfm-error{color:#b91c1c;font-size:.85rem;margin-top:4px}

/* Botones */
.pfm-btn{border:none;border-radius:10px;padding:10px 14px;cursor:pointer;font-weight:700}
.pfm-btn--muted{background:#f1f5f9}
.pfm-btn--primary{background:#0ea5e9;color:#fff}
.pfm-btn--success{background:#22c55e;color:#fff}
.pfm-btn--danger{background:#ef4444;color:#fff}
.pfm-btn--pill{border-radius:999px;padding:8px 12px;font-size:.85rem}
.pfm-hint{font-size:.85rem;color:#64748b}
.pfm-note{font-size:.85rem;color:#64748b}

/* Thumbs */
.pfm-thumbs{display:flex;gap:10px;flex-wrap:wrap;margin-top:10px}
.pfm-thumb{position:relative}
.pfm-thumb img{width:72px;height:72px;object-fit:cover;border-radius:8px;border:1px solid #e5e7eb;background:#fff}
.pfm-thumb button{
  position:absolute;top:-6px;right:-6px;background:#ef4444;border:none;color:#fff;border-radius:50%;
  font-size:12px;cursor:pointer;width:20px;height:20px;display:flex;align-items:center;justify-content:center;
}
.pfm-empty{
  border:1px dashed #cbd5e1;border-radius:10px;padding:16px;display:flex;align-items:center;gap:12px;color:#64748b;background:#fafafa
}
.pfm-empty-icon{font-size:1.1rem}
.pfm-empty-text{font-size:.95rem}

/* Responsive */
@media (max-width: 920px){
  .pfm-modal-content{grid-template-columns:1fr !important}
  .pfm-row,.pfm-row--stack{grid-template-columns: 1fr;align-items:stretch}
}
`;

// Inyectar estilos una única vez
let _pfmInjected = false;
if (typeof document !== "undefined" && !_pfmInjected) {
  const tag = document.createElement("style");
  tag.innerHTML = injectedCSS;
  document.head.appendChild(tag);
  _pfmInjected = true;
}

/* =========================
   Util: compresión de imagen
   ========================= */
async function compressImage(file, { maxWidth = 1280, quality = 0.8, maxBytes = 1_200_000 } = {}) {
  if (!file || !file.type?.startsWith("image/")) return null;
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxWidth / bitmap.width);
  const targetW = Math.round(bitmap.width * scale);
  const targetH = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = targetW;
  canvas.height = targetH;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(bitmap, 0, 0, targetW, targetH);

  // compresión adaptativa si supera maxBytes
  let q = quality;
  let blob = await new Promise((res) => canvas.toBlob(res, "image/jpeg", q));
  while (blob && blob.size > maxBytes && q > 0.4) {
    q -= 0.1;
    blob = await new Promise((res) => canvas.toBlob(res, "image/jpeg", q));
  }
  if (!blob) return null;

  const dataURL = await blobToDataURL(blob);
  return { blob: new File([blob], file.name.replace(/\.(png|jpg|jpeg|webp)$/i, ".jpg"), { type: "image/jpeg" }), dataURL };
}
function blobToDataURL(blob) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

export default ProductoFormModal;
