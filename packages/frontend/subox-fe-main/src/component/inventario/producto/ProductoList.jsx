import React, { useEffect, useState, useRef } from "react";
import HistorialClienteModal from "./modal/HistorialClienteModal";
import EtiquetaClienteModal from "./modal/EtiquetaClienteModal";
import ClienteFormModal from "./modal/ClienteFormModal";
import ClienteMenuModal from "./modal/ClienteMenuModal";
import ConfirmModal from "../../common/modal/ConfirmModal";
import AlertModal from "../../common/modal/AlertModal";
import {
  getClientes,
  createCliente,
  updateCliente,
  deleteCliente,
} from "./api/productos";

const ProductoList = () => {
  const [productos, setProductos] = useState([]);
  const [editing, setEditing] = useState(null);
  const [productoRegistrado, setProductoRegistrado] = useState(null);

  const [filters, setFilters] = useState({
    nombre: "",
    precio: "",
    categoria: "",
    imagen: "",
  });
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 4;

  // Estados para los modales y otras variables
  const [modals, setModals] = useState({
    clienteFormModal: false,     // Modal para agregar/editar producto
    clienteHistorialModal: false, // Modal para ver historial de producto
    clienteEtiquetaModal: false, // Modal para agregar etiqueta a producto
    modalMenuAcciones: false, // Modal para acciones de producto
    idClienteELiminar: null,      // ID del producto a eliminar
    idClienteMenu: null,   // ID del producto cuyo menú está abierto
    idClienteEtiqueta: null,    // producto seleccionado para agregar etiqueta
    selectedCliente: null, // Agregamos selectedCliente aquí
    alertMessage: null,   // Mensaje de alerta
  });

  const menuRefs = useRef({});

  // Cargar productos
  useEffect(() => {
    loadClientes();
  }, []);

  const loadClientes = async () => {
    try {
      const data = await getClientes();
      setProductos(data);
    } catch (err) {
      console.error(err);
      setModals((prevState) => ({ ...prevState, alertMessage: "Error al cargar productos." }));
    }
  };

  // Reset página al cambiar filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Persistir filtros en localStorage
  useEffect(() => {
    const stored = localStorage.getItem("producto-filtros");
    if (stored) setFilters(JSON.parse(stored));
  }, []);
  useEffect(() => {
    localStorage.setItem("producto-filtros", JSON.stringify(filters));
  }, [filters]);

  // Filtrado
  const filtered = productos.filter((c) =>

    ["nombre", "precio", "categoria", "imagen",].every(
      (key) => !filters[key] || c[key].toLowerCase().includes(filters[key])
    )
  );

  // Ordenamiento
  const sortedData = [...filtered].sort((a, b) => {
    if (!sortKey) return 0;
    const valA = typeof a[sortKey] === "string" ? a[sortKey].toLowerCase() : a[sortKey];
    const valB = typeof b[sortKey] === "string" ? b[sortKey].toLowerCase() : b[sortKey];
    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // Paginación
  const paginated = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Manejo de ordenamiento
  const handleSort = (key) => {
    setSortKey(key);
    setSortOrder((prev) => (sortKey === key && prev === "asc" ? "desc" : "asc"));
  };

  // Guardar (POST/PUT)
  const handleSave = async (form) => {
    console.log("Guardando producto:", form);

    try {
      if (editing) {
        console.log("Editando producto");
        let response = await updateCliente(form.id, form);
        console.log("producto editado:", response);
        // Actualizamos el producto editado en la lista
        setProductos((prev) => prev.map((c) => (c.id === form.id ? form : c)));
        setEditing(null);
        setModals((prevState) => ({
          ...prevState,
          clienteFormModal: false,  // Cerrar el modal de producto
          alertMessage: "producto Editado correctamente.", // Mostrar mensaje de éxito
        }));
      } else {
        console.log("Creando producto");
        const nuevo = await createCliente(form);
        setProductos((prev) => [...prev, nuevo]); // Agregar el producto creado a la lista

        setProductoRegistrado(nuevo); // Guardar el producto registrado para mostrarlo en el modal

        // Actualizamos todos los modales a la vez
        setModals((prevState) => ({
          ...prevState,
          clienteFormModal: false,  // Cerrar el modal de producto
          alertMessage: "producto registrado correctamente.", // Mostrar mensaje de éxito
        }));

        console.log("Modal de producto registrado abierto");
      }
    } catch (err) {
      console.error(err);
      setModals((prevState) => ({ ...prevState, alertMessage: "Error al guardar producto." }));
    }
  };

  // Solicitar confirmación de borrado
  const handleDelete = (id) => {
    setModals((prevState) => ({ ...prevState, idClienteELiminar: id }));
  };
  const confirmDeleteAction = async () => {
    try {
      const response = await deleteCliente(modals.idClienteELiminar);

      // Si la respuesta es null (204 No Content), no necesitamos hacer nada con ella
      if (response === null) {
        console.log("producto eliminado correctamente.");
      } else {
        console.log("producto eliminado:", response);
      }

      // Actualizamos la lista de productos, eliminando el producto con el ID correspondiente
      setProductos((prev) => prev.filter((c) => c.id !== modals.idClienteELiminar));

      // Si el producto eliminado es el seleccionado, actualizamos el estado de selectedCliente
      if (modals.selectedCliente?.id === modals.idClienteELiminar) {
        setModals((prevState) => ({ ...prevState, selectedCliente: null }));
      }

      // Mostrar mensaje de éxito
      setModals((prevState) => ({ ...prevState, alertMessage: "producto eliminado correctamente." }));
    } catch (err) {
      console.error('Error al eliminar producto:', err);
      setModals((prevState) => ({ ...prevState, alertMessage: "Error al eliminar producto." }));
    } finally {
      // Restablecer la variable idClienteELiminar en el estado de los modales
      setModals((prevState) => ({ ...prevState, idClienteELiminar: null }));
    }
  };

  // Cerrar todos los modales
  const closeAllModals = () => {
    setModals({
      clienteFormModal: false,
      modalMenuAcciones: false,
      clienteHistorialModal: false,
      clienteEtiquetaModal: false,
      idClienteELiminar: null,
      alertMessage: null,
      idClienteMenu: null,
      idClienteEtiqueta: null,
      selectedCliente: null,
    });
    setEditing(null);
  };

  const closeAlertModal = () => {
    setModals((prevState) => ({ ...prevState, alertMessage: null }));
    setProductoRegistrado(null); // Limpiar el producto registrado
  };

  const abrirModalMenuAcciones = (producto) => {
    console.log("Abriendo modal de acciones para producto:", producto);
    // Cerrar todos los modales antes de abrir el nuevo
    closeAllModals();
    // Abrir el modal de acciones
    setModals((prevState) => ({
      ...prevState,
      modalMenuAcciones: true,
      idClienteMenu: prevState.idClienteMenu === producto.id ?
        null :
        producto.id
    }))
  }

  return (
    <div style={{ padding: "1rem" }}>
      <ClienteFormModal
        isOpen={modals.clienteFormModal}
        onClose={() => setModals((prevState) => ({ ...prevState, clienteFormModal: false }))}
        initialData={editing || {}}
        onSave={handleSave}
      />

      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
        <button onClick={() => setModals((prevState) => ({ ...prevState, clienteFormModal: true }))} style={styles.btnAdd}>
          ➕ Agregar producto
        </button>
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              {['id', 'nombre', 'precio', 'categoria', 'imagen',].map((col) => (
                <th key={col} style={styles.th}>
                  <label style={styles.label} onClick={() => handleSort(col)}>
                    {col.toUpperCase()} {sortKey === col ? (sortOrder === "asc" ? '🔼' : '🔽') : null}
                  </label>
                  {col !== 'id' && (
                    <input
                      type="text"
                      placeholder={`Filtrar ${col}`}
                      value={filters[col]}
                      onChange={(e) =>
                        setFilters((f) => ({ ...f, [col]: e.target.value.toLowerCase() }))}
                      style={styles.filterInput}
                    />
                  )}
                </th>
              ))}
              <th style={styles.th}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((c, i) => (
              <tr key={c.id} style={{ backgroundColor: i % 2 === 0 ? '#fdfdfd' : '#f7f7f7' }}>
                <td style={styles.td}>{c.id}</td>
                <td style={styles.td}>{c.nombre}</td>
                <td style={styles.td}>{c.precio}</td>
                <td style={styles.td}>{c.categoria}</td>
                <td style={styles.td}>
                  <img src={c.imagen} alt="Test" style={{ width: '100px' }} />
                </td>
                <td style={{ ...styles.td, position: 'relative' }}>
                  <button
                    ref={(el) => (menuRefs.current[c.id] = el)}
                    onClick={() => { abrirModalMenuAcciones(c) }}
                    style={styles.menuBtn}
                  >
                    ⋯
                  </button>
                  <ClienteMenuModal
                    isOpen={modals.idClienteMenu === c.id && modals.modalMenuAcciones}
                    onClose={closeAllModals}
                    onEdit={() => {
                      setEditing(c);
                      setModals((prevState) => ({
                        ...prevState,
                        modalMenuAcciones: false,
                        clienteFormModal: true,
                      }));
                    }}
                    onDelete={() => {
                      handleDelete(c.id)
                      setModals((prevState) => ({
                        ...prevState,
                        modalMenuAcciones: false,
                        idClienteELiminar: c.id
                      }));
                    }}
                    onHistorial={() => {
                      setModals((prevState) => ({
                        ...prevState,
                        selectedCliente: c,
                        modalMenuAcciones: false,
                        clienteHistorialModal: true
                      }));
                    }}
                    onEtiqueta={() => {
                      setModals((prevState) => ({
                        ...prevState,
                        idClienteEtiqueta: c,
                        clienteEtiquetaModal: true,
                        modalMenuAcciones: false,

                      }));
                    }}
                    triggerRef={{ current: menuRefs.current[c.id] }}
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
              backgroundColor: currentPage === i + 1 ? '#007bff' : '#e0e0e0',
              color: currentPage === i + 1 ? '#fff' : '#000',
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {modals.selectedCliente && (
        <HistorialClienteModal
          producto={modals.selectedCliente}
          isOpen={modals.clienteHistorialModal}
          onClose={() => {
            closeAllModals();
          }}
        />
      )}
      <EtiquetaClienteModal
        producto={modals.idClienteEtiqueta}
        isOpen={modals.clienteEtiquetaModal}
        onClose={() => {
          closeAllModals();
        }}
      />
      <ConfirmModal
        isOpen={!!modals.idClienteELiminar}
        onClose={closeAllModals}
        onConfirm={confirmDeleteAction}
        message="¿Estás seguro que deseas eliminar este producto?"
      />
      <AlertModal
        isOpen={!!modals.alertMessage}
        onClose={closeAllModals}
        message={modals.alertMessage}
      />
      {/* Mostrar modal con mensaje de producto registrado */}
      {productoRegistrado && (
        <AlertModal
          isOpen={!!modals.alertMessage}
          onClose={closeAlertModal}
          message={`producto registrado: ${productoRegistrado.nombre} - ${productoRegistrado.rut}`}
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
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #eee",
    textAlign: "left",
  },
  label: {
    cursor: "pointer",
    userSelect: "none",
  },
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
  pagination: {
    textAlign: "center",
    marginTop: "20px",
  },
  pageBtn: {
    margin: "0 4px",
    padding: "6px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default ProductoList;
