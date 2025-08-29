import React, { useEffect, useState, useRef, useMemo } from "react";
import HistorialClienteModal from "./modal/HistorialClienteModal";
import EtiquetaClienteModal from "./modal/EtiquetaClienteModal";
import ProductoFormModal from "./modal/ProductoFormModal";
import ClienteMenuModal from "./modal/ClienteMenuModal";
import ConfirmModal from "../../common/modal/ConfirmModal";
import AlertModal from "../../common/modal/AlertModal";
import { ProductoApi } from "./api/productos";
import BarcodeScanner from "./BarcodeScanner";

// Columnas usando estructura real del backend
const columns = [
  "id",
  "codigoBarras",
  "nombre",
  "descripcion",
  "precioCompra",
  "precioVenta",
  "stock",
  "fechaIngreso",
  "categoria",
  "marca",
  "calidad",
  "estadoProducto",
  "imagen",
];

const rowsPerPage = 4;

const ProductoList = () => {
  const [productos, setProductos] = useState([]);
  const [editing, setEditing] = useState(null);
  const [productoRegistrado, setProductoRegistrado] = useState(null);

  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState("fechaIngreso");
  const [sortOrder, setSortOrder] = useState("desc");

  const [modals, setModals] = useState({
    productoFormModal: false,
    productoHistorialModal: false,
    productoEtiquetaModal: false,
    modalMenuAcciones: false,
    idProductoEliminar: null,
    idProductoMenu: null,
    selectedProducto: null,
    alertMessage: null,
  });

  const menuRefs = useRef({});

  useEffect(() => {
    loadProductos();
  }, []);

  const loadProductos = async () => {
    try {
      const data = await ProductoApi.list();
      setProductos(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setModals((s) => ({ ...s, alertMessage: "Error al cargar productos." }));
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // --- Filtrado
  const filtered = productos.filter((p) =>
    Object.keys(filters).every((k) => {
      const v = (filters[k] ?? "").toString().trim().toLowerCase();
      if (!v) return true;

      let cell;
      if (k === "categoria") cell = p.categoria?.nombre ?? "Sin categoría";
      else if (k === "marca") cell = p.marca?.nombre ?? "Sin marca";
      else if (k === "calidad") cell = p.calidad?.nombre ?? "Sin calidad";
      else if (k === "estadoProducto") cell = p.estadoProducto?.estado ?? "Sin estado";
      else cell = p?.[k] ?? "";

      return cell.toString().toLowerCase().includes(v);
    })
  );

  // --- Ordenamiento
  const sortedData = [...filtered].sort((a, b) => {
    if (!sortKey) return 0;
    let A, B;

    if (sortKey === "categoria") {
      A = a.categoria?.nombre ?? "Sin categoría";
      B = b.categoria?.nombre ?? "Sin categoría";
    } else if (sortKey === "marca") {
      A = a.marca?.nombre ?? "Sin marca";
      B = b.marca?.nombre ?? "Sin marca";
    } else if (sortKey === "calidad") {
      A = a.calidad?.nombre ?? "Sin calidad";
      B = b.calidad?.nombre ?? "Sin calidad";
    } else if (sortKey === "estadoProducto") {
      A = a.estadoProducto?.estado ?? "Sin estado";
      B = b.estadoProducto?.estado ?? "Sin estado";
    } else {
      A = a?.[sortKey];
      B = b?.[sortKey];
    }

    const valA = typeof A === "string" ? A.toLowerCase() : A;
    const valB = typeof B === "string" ? B.toLowerCase() : B;

    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const paginated = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleSort = (key) => {
    setSortKey(key);
    setSortOrder((prev) =>
      sortKey === key && prev === "asc" ? "desc" : "asc"
    );
  };

  // Guardar producto
  const handleSave = async (form) => {
    try {
      if (editing) {
        const updated = await ProductoApi.update(form.id, form);
        setProductos((prev) => prev.map((p) => (p.id === form.id ? { ...p, ...updated } : p)));
        setEditing(null);
        setModals((s) => ({
          ...s,
          productoFormModal: false,
          alertMessage: "Producto editado correctamente.",
        }));
      } else {
        const nuevo = await ProductoApi.create(form);
        setProductos((prev) => [...prev, nuevo]);
        setProductoRegistrado(nuevo);
        setModals((s) => ({
          ...s,
          productoFormModal: false,
          alertMessage: "Producto registrado correctamente.",
        }));
      }
    } catch (err) {
      console.error(err);
      setModals((s) => ({ ...s, alertMessage: "Error al guardar producto." }));
    }
  };

  // Acciones menú
  const abrirModalMenuAcciones = (producto) => {
    setModals((s) => ({
      ...s,
      modalMenuAcciones: true,
      idProductoMenu: producto.id,
      selectedProducto: producto,
    }));
  };

  return (
    <div style={{ padding: "1rem" }}>
      {/* Botón Agregar producto */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
        <button
          onClick={() => {
            setEditing(null);
            setModals((s) => ({ ...s, productoFormModal: true }));
          }}
          style={styles.btnAdd}
        >
          ➕ Agregar producto
        </button>
      </div>

      {/* Form modal */}
      <ProductoFormModal
        isOpen={modals.productoFormModal}
        onClose={() => setModals((s) => ({ ...s, productoFormModal: false }))}
        initialData={editing || {}}
        onSave={handleSave}
      />

      <BarcodeScanner />

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col} style={styles.th}>
                  <label style={styles.label} onClick={() => handleSort(col)}>
                    {col.toUpperCase()}{" "}
                    {sortKey === col ? (sortOrder === "asc" ? "🔼" : "🔽") : null}
                  </label>
                  {col !== "id" && col !== "imagen" && (
                    <input
                      type="text"
                      placeholder={`Filtrar ${col}`}
                      value={filters[col] || ""}
                      onChange={(e) =>
                        setFilters((f) => ({
                          ...f,
                          [col]: e.target.value.toLowerCase(),
                        }))
                      }
                      style={styles.filterInput}
                    />
                  )}
                </th>
              ))}
              <th style={styles.th}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((p, i) => (
              <tr key={p.id} style={{ backgroundColor: i % 2 === 0 ? "#fdfdfd" : "#f7f7f7" }}>
                {columns.map((col) => (
                  <td key={col} style={styles.td}>
                    {col === "imagen" ? (
                      <img
                        src={p.imagen || "https://via.placeholder.com/50"}
                        alt={p.nombre}
                        style={{
                          width: 50,
                          height: 50,
                          objectFit: "cover",
                          borderRadius: 4,
                          border: "1px solid #ccc",
                        }}
                      />
                    ) : col === "categoria" ? (
                      p.categoria?.nombre || "Sin categoría"
                    ) : col === "marca" ? (
                      p.marca?.nombre || "Sin marca"
                    ) : col === "calidad" ? (
                      p.calidad?.nombre || "Sin calidad"
                    ) : col === "estadoProducto" ? (
                      p.estadoProducto?.estado || "Sin estado"
                    ) : (
                      (p?.[col] ?? "").toString()
                    )}
                  </td>
                ))}
                <td style={styles.td}>
                  <button
                    ref={(el) => (menuRefs.current[p.id] = el)}
                    onClick={() => abrirModalMenuAcciones(p)}
                    style={styles.menuBtn}
                  >
                    ⋯
                  </button>
                  <ClienteMenuModal
                    isOpen={modals.idProductoMenu === p.id && modals.modalMenuAcciones}
                    onClose={() => setModals((s) => ({ ...s, modalMenuAcciones: false }))}
                    onEdit={() => {
                      setEditing(p);
                      setModals((s) => ({
                        ...s,
                        modalMenuAcciones: false,
                        productoFormModal: true,
                      }));
                    }}
                    onDelete={() => {
                      setModals((s) => ({
                        ...s,
                        idProductoEliminar: p.id,
                        modalMenuAcciones: false,
                      }));
                    }}
                    onHistorial={() => {
                      setModals((s) => ({
                        ...s,
                        selectedProducto: p,
                        productoHistorialModal: true,
                        modalMenuAcciones: false,
                      }));
                    }}
                    onEtiqueta={() => {
                      setModals((s) => ({
                        ...s,
                        selectedProducto: p,
                        productoEtiquetaModal: true,
                        modalMenuAcciones: false,
                      }));
                    }}
                    triggerRef={{ current: menuRefs.current[p.id] }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* paginación */}
      <div style={styles.pagination}>
        {Array.from({ length: Math.ceil(sortedData.length / rowsPerPage) }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            style={{
              ...styles.pageBtn,
              backgroundColor: currentPage === i + 1 ? "#007bff" : "#e0e0e0",
              color: currentPage === i + 1 ? "#fff" : "#000",
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Modales auxiliares */}
      <ConfirmModal
        isOpen={!!modals.idProductoEliminar}
        onClose={() => setModals((s) => ({ ...s, idProductoEliminar: null }))}
        onConfirm={async () => {
          try {
            await ProductoApi.remove(modals.idProductoEliminar);
            setProductos((prev) => prev.filter((p) => p.id !== modals.idProductoEliminar));
            setModals((s) => ({ ...s, idProductoEliminar: null, alertMessage: "Producto eliminado." }));
          } catch (err) {
            setModals((s) => ({ ...s, idProductoEliminar: null, alertMessage: "Error al eliminar." }));
          }
        }}
        message="¿Estás seguro que deseas eliminar este producto?"
      />

      {modals.selectedProducto && modals.productoHistorialModal && (
        <HistorialClienteModal
          producto={modals.selectedProducto}
          isOpen={true}
          onClose={() => setModals((s) => ({ ...s, productoHistorialModal: false }))}
        />
      )}

      {modals.selectedProducto && modals.productoEtiquetaModal && (
        <EtiquetaClienteModal
          producto={modals.selectedProducto}
          isOpen={true}
          onClose={() => setModals((s) => ({ ...s, productoEtiquetaModal: false }))}
        />
      )}

      <AlertModal
        isOpen={!!modals.alertMessage}
        onClose={() => setModals((s) => ({ ...s, alertMessage: null }))}
        message={modals.alertMessage}
      />
    </div>
  );
};

const styles = {
  tableContainer: {
    width: "100%",
    overflowX: "auto",
    boxShadow: "0 0 10px rgba(0,0,0,0.05)",
    borderRadius: "8px",
  },
  table: {
    width: "100%",
    minWidth: "1100px",
    borderCollapse: "collapse",
    fontSize: "0.9rem",
  },
  th: {
    padding: "10px",
    backgroundColor: "#f0f2f5",
    borderBottom: "2px solid #ddd",
    textAlign: "left",
    fontWeight: "bold",
    verticalAlign: "top",
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #eee",
    textAlign: "left",
    whiteSpace: "nowrap",
  },
  label: { cursor: "pointer", userSelect: "none" },
  filterInput: {
    width: "100%",
    padding: "4px",
    marginTop: "4px",
    fontSize: "0.8rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  btnAdd: {
    padding: "8px 16px",
    backgroundColor: "#28a745",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  menuBtn: {
    padding: "6px 10px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#6c757d",
    color: "#fff",
    cursor: "pointer",
  },
  pagination: { textAlign: "center", marginTop: "20px" },
  pageBtn: {
    margin: "0 4px",
    padding: "6px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default ProductoList;
