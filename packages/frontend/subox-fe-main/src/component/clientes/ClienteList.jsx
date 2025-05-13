import React, { useEffect, useState, useRef } from "react";
import HistorialClienteModal from "./HistorialClienteModal";
import EtiquetaCliente from "./EtiquetaCliente";
import ClienteModalForm from "./ClienteModalForm";
import ClienteMenu from "./ClienteMenu";
import ConfirmModal from "../modal/ConfirmModal";
import AlertModal from "../modal/AlertModal";
import {
  getClientes,
  createCliente,
  updateCliente,
  deleteCliente,
} from "./api/clientes";

const ClienteList = () => {
  const [clientes, setClientes] = useState([]);
  const [editing, setEditing] = useState(null);
  const [adding, setAdding] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [clienteEtiqueta, setClienteEtiqueta] = useState(null);
  const [filters, setFilters] = useState({
    nombre: "",
    rut: "",
    telefono: "",
    email: "",
    direccion: "",
  });
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;
  const menuRefs = useRef({});

  // Carga inicial
  useEffect(() => {
    loadClientes();
  }, []);

  const loadClientes = async () => {
    try {
      const data = await getClientes();
      setClientes(data);
    } catch (err) {
      console.error(err);
      setAlertMessage("Error al cargar clientes.");
    }
  };

  // Reset página al cambiar filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Persistir filtros en localStorage
  useEffect(() => {
    const stored = localStorage.getItem("cliente-filtros");
    if (stored) setFilters(JSON.parse(stored));
  }, []);
  useEffect(() => {
    localStorage.setItem("cliente-filtros", JSON.stringify(filters));
  }, [filters]);

  // Filtrado
  const filtered = clientes.filter((c) =>
    ["nombre", "rut", "telefono", "email", "direccion"].every(
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

  const handleSort = (key) => {
    setSortKey(key);
    setSortOrder((prev) => (sortKey === key && prev === "asc" ? "desc" : "asc"));
  };

  // Guardar (POST/PUT)
  const handleSave = async (form) => {
    try {
      if (editing) {
        await updateCliente(form.id, form);
        setClientes((prev) => prev.map((c) => (c.id === form.id ? form : c)));
        setEditing(null);
      } else {
        const nuevo = await createCliente(form);
        setClientes((prev) => [...prev, nuevo]);
        setAdding(false);
      }
      setMenuOpenId(null);
    } catch (err) {
      console.error(err);
      setAlertMessage("Error al guardar cliente.");
    }
  };

  // Solicita confirmación de borrado
  const handleDelete = (id) => {
    setConfirmDelete(id);
    setMenuOpenId(null);
  };

  const confirmDeleteAction = async () => {
    try {
      await deleteCliente(confirmDelete);
      setClientes((prev) => prev.filter((c) => c.id !== confirmDelete));
      if (selectedCliente?.id === confirmDelete) setSelectedCliente(null);
      setAlertMessage("Cliente eliminado correctamente.");
    } catch (err) {
      console.error(err);
      setAlertMessage("Error al eliminar cliente.");
    } finally {
      setConfirmDelete(null);
    }
  };

  const closeAllModals = () => {
    setConfirmDelete(null);
    setAlertMessage(null);
    setSelectedCliente(null);
    setEditing(null);
    setAdding(false);
    setMenuOpenId(null);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <ClienteModalForm
        isOpen={adding || editing}
        onClose={closeAllModals}
        initialData={editing || {}}
        onSave={handleSave}
      />

      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
        <button onClick={() => setAdding(true)} style={styles.btnAdd}>
          ➕ Agregar Cliente
        </button>
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              {['id','nombre','rut','telefono','email','direccion'].map((col) => (
                <th key={col} style={styles.th}>
                  <label style={styles.label} onClick={() => handleSort(col)}>
                    {col.toUpperCase()} {sortKey===col?(sortOrder==='asc'?'🔼':'🔽'):null}
                  </label>
                  {col!=='id' && (
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
            {paginated.map((c,i) => (
              <tr key={c.id} style={{ backgroundColor: i%2===0?'#fdfdfd':'#f7f7f7' }}>
                <td style={styles.td}>{c.id}</td>
                <td style={styles.td}>{c.nombre}</td>
                <td style={styles.td}>{c.rut}</td>
                <td style={styles.td}>{c.telefono}</td>
                <td style={styles.td}>{c.email}</td>
                <td style={styles.td}>{c.direccion}</td>
                <td style={{ ...styles.td, position: 'relative' }}>
                  <button
                    ref={(el) => (menuRefs.current[c.id] = el)}
                    onClick={() => setMenuOpenId(menuOpenId===c.id?null:c.id)}
                    style={styles.menuBtn}
                  >⋯</button>
                  <ClienteMenu
                    isOpen={menuOpenId===c.id}
                    onClose={closeAllModals}
                    onEdit={() => { setEditing(c); }}
                    onDelete={() => handleDelete(c.id)}
                    onHistorial={() => { setSelectedCliente(c); }}
                    onEtiqueta={() => { setClienteEtiqueta(c); }}
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
        {Array.from({ length: Math.ceil(sortedData.length/rowsPerPage) }, (_,i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i+1)}
            style={{
              ...styles.pageBtn,
              backgroundColor: currentPage===i+1?'#007bff':'#e0e0e0',
              color: currentPage===i+1?'#fff':'#000',
            }}
          >{i+1}</button>
        ))}
      </div>

      {selectedCliente && (
        <HistorialClienteModal cliente={selectedCliente} onClose={closeAllModals} />
      )}
      {clienteEtiqueta && (
        <EtiquetaCliente cliente={clienteEtiqueta} onClose={closeAllModals} />
      )}
      <ConfirmModal
        isOpen={!!confirmDelete}
        onClose={closeAllModals}
        onConfirm={confirmDeleteAction}
        message="¿Estás seguro que deseas eliminar este cliente?"
      />
      <AlertModal
        isOpen={!!alertMessage}
        onClose={closeAllModals}
        message={alertMessage}
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

export default ClienteList;
