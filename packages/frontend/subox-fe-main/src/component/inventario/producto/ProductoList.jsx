import React, { useEffect, useState, useRef, useMemo } from "react";
import HistorialClienteModal from "./modal/HistorialClienteModal";
import EtiquetaClienteModal from "./modal/EtiquetaClienteModal";
import ProductoFormModal from "./modal/ProductoFormModal";
import ClienteMenuModal from "./modal/ClienteMenuModal";
import ConfirmModal from "../../common/modal/ConfirmModal";
import AlertModal from "../../common/modal/AlertModal";
import { ProductoApi } from "./api/productos";
import BarcodeScanner from "./BarcodeScanner";

const columns = [
  "id",
  "codigoBarras",
  "nombre",
  "descripcion",
  "precioCompra",
  "precioVenta",
  "stock",
  "fechaIngreso",
];

const rowsPerPage = 4;

const ProductoList = () => {
  const [productos, setProductos] = useState([]);
  const [editing, setEditing] = useState(null);
  const [productoRegistrado, setProductoRegistrado] = useState(null);

  // filtros por columna (excepto id)
  const defaultFilters = useMemo(() => {
    const f = {};
    columns.forEach((c) => {
      if (c !== "id") f[c] = "";
    });
    return f;
  }, []);

  const [filters, setFilters] = useState(defaultFilters);
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);

  const [modals, setModals] = useState({
    productoFormModal: false,
    productoHistorialModal: false,
    productoEtiquetaModal: false,
    modalMenuAcciones: false,
    idProductoEliminar: null,
    idProductoMenu: null,
    idProductoEtiqueta: null,
    selectedProducto: null,
    alertMessage: null,
  });

  const menuRefs = useRef({});

  // Cargar productos
  useEffect(() => {
    loadProductos();
    // cargar filtros guardados si existen y sincronizar claves nuevas
    const stored = localStorage.getItem("producto-filtros");
    if (stored) {
      const parsed = JSON.parse(stored);
      setFilters({ ...defaultFilters, ...parsed });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // Reset página al cambiar filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Persistir filtros
  useEffect(() => {
    localStorage.setItem("producto-filtros", JSON.stringify(filters));
  }, [filters]);

  // Filtrado (string-contains sobre cada filtro no vacío)
  const filtered = productos.filter((p) =>
    Object.keys(filters).every((k) => {
      const v = (filters[k] ?? "").toString().trim().toLowerCase();
      if (!v) return true;
      const cell = (p?.[k] ?? "").toString().toLowerCase();
      return cell.includes(v);
    })
  );

  // Ordenamiento
  const sortedData = [...filtered].sort((a, b) => {
    if (!sortKey) return 0;
    const A = a?.[sortKey];
    const B = b?.[sortKey];
    const valA = typeof A === "string" ? A.toLowerCase() : A;
    const valB = typeof B === "string" ? B.toLowerCase() : B;
    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // Paginación
  const paginated = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Sort handler
  const handleSort = (key) => {
    setSortKey(key);
    setSortOrder((prev) => (sortKey === key && prev === "asc" ? "desc" : "asc"));
  };

  // Guardar (POST/PUT)
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

  // Delete
  const handleDelete = (id) => {
    setModals((s) => ({ ...s, idProductoEliminar: id }));
  };

  const confirmDeleteAction = async () => {
    try {
      await ProductoApi.remove(modals.idProductoEliminar);
      setProductos((prev) => prev.filter((p) => p.id !== modals.idProductoEliminar));
      if (modals.selectedProducto?.id === modals.idProductoEliminar) {
        setModals((s) => ({ ...s, selectedProducto: null }));
      }
      setModals((s) => ({ ...s, alertMessage: "Producto eliminado correctamente." }));
    } catch (err) {
      console.error("Error al eliminar producto:", err);
      setModals((s) => ({ ...s, alertMessage: "Error al eliminar producto." }));
    } finally {
      setModals((s) => ({ ...s, idProductoEliminar: null }));
    }
  };

  // Modales
  const closeAllModals = () => {
    setModals({
      productoFormModal: false,
      modalMenuAcciones: false,
      productoHistorialModal: false,
      productoEtiquetaModal: false,
      idProductoEliminar: null,
      alertMessage: null,
      idProductoMenu: null,
      idProductoEtiqueta: null,
      selectedProducto: null,
    });
    setEditing(null);
  };

  const closeAlertModal = () => {
    setModals((s) => ({ ...s, alertMessage: null }));
    setProductoRegistrado(null);
  };

  const abrirModalMenuAcciones = (producto) => {
    closeAllModals();
    setModals((s) => ({
      ...s,
      modalMenuAcciones: true,
      idProductoMenu: s.idProductoMenu === producto.id ? null : producto.id,
    }));
  };

  return (
    <div style={{ padding: "1rem" }}>
      <ProductoFormModal
        isOpen={modals.productoFormModal}
        onClose={() => setModals((s) => ({ ...s, productoFormModal: false }))}
        initialData={editing || {}}
        onSave={handleSave}
      />

      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
        <button
          onClick={() => setModals((s) => ({ ...s, productoFormModal: true }))}
          style={styles.btnAdd}
        >
          ➕ Agregar producto
        </button>
      </div>

      <div>
        <BarcodeScanner />
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col} style={styles.th}>
                  <label style={styles.label} onClick={() => handleSort(col)}>
                    {col.toUpperCase()} {sortKey === col ? (sortOrder === "asc" ? "🔼" : "🔽") : null}
                  </label>
                  {col !== "id" && (
                    <input
                      type="text"
                      placeholder={`Filtrar ${col}`}
                      value={filters[col]}
                      onChange={(e) =>
                        setFilters((f) => ({ ...f, [col]: e.target.value.toLowerCase() }))
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
                    {(p?.[col] ?? "").toString()}
                  </td>
                ))}
                <td style={{ ...styles.td, position: "relative" }}>
                  <button
                    ref={(el) => (menuRefs.current[p.id] = el)}
                    onClick={() => abrirModalMenuAcciones(p)}
                    style={styles.menuBtn}
                  >
                    ⋯
                  </button>
                  <ClienteMenuModal
                    isOpen={modals.idProductoMenu === p.id && modals.modalMenuAcciones}
                    onClose={closeAllModals}
                    onEdit={() => {
                      setEditing(p);
                      setModals((s) => ({
                        ...s,
                        modalMenuAcciones: false,
                        productoFormModal: true,
                      }));
                    }}
                    onDelete={() => {
                      handleDelete(p.id);
                      setModals((s) => ({
                        ...s,
                        modalMenuAcciones: false,
                        idProductoEliminar: p.id,
                      }));
                    }}
                    onHistorial={() => {
                      setModals((s) => ({
                        ...s,
                        selectedProducto: p,
                        modalMenuAcciones: false,
                        productoHistorialModal: true,
                      }));
                    }}
                    onEtiqueta={() => {
                      setModals((s) => ({
                        ...s,
                        idProductoEtiqueta: p,
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

      {/* Paginación */}
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

      {modals.selectedProducto && (
        <HistorialClienteModal
          producto={modals.selectedProducto}
          isOpen={modals.productoHistorialModal}
          onClose={closeAllModals}
        />
      )}

      <EtiquetaClienteModal
        producto={modals.idProductoEtiqueta}
        isOpen={modals.productoEtiquetaModal}
        onClose={closeAllModals}
      />

      <ConfirmModal
        isOpen={!!modals.idProductoEliminar}
        onClose={closeAllModals}
        onConfirm={confirmDeleteAction}
        message="¿Estás seguro que deseas eliminar este producto?"
      />

      <AlertModal
        isOpen={!!modals.alertMessage}
        onClose={closeAlertModal}
        message={modals.alertMessage}
      />

      {/* Modal de producto registrado */}
      {productoRegistrado && (
        <AlertModal
          isOpen={!!modals.alertMessage}
          onClose={closeAlertModal}
          message={`Producto registrado: ${productoRegistrado.nombre} - ${productoRegistrado.codigoBarras ?? ""}`}
        />
      )}
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
    minWidth: "900px",
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
