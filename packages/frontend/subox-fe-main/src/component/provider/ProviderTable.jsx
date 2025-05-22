import React, { useState, useEffect } from "react";
import styles from "./ProviderTable.module.css";
import { getProveedores, deleteProveedor } from "./providerService";
import ProviderFormModal from "./ProviderFormModal";
import ProviderDetailModal from "./ProviderDetailModal";

export default function ProviderTable() {
  const [proveedores, setProveedores] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [detalle, setDetalle] = useState(null);

  const fetchProveedores = async () => {
    setProveedores(await getProveedores());
  };

  useEffect(() => { fetchProveedores(); }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este proveedor?")) {
      await deleteProveedor(id);
      fetchProveedores();
    }
  };

  const filtered = proveedores.filter(
    p => p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
         p.rut.includes(busqueda)
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <input
          className={styles.search}
          placeholder="Buscar proveedor..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
        />
        <button className={styles.addBtn} onClick={() => { setEditing(null); setModalOpen(true); }}>
          + Agregar Proveedor
        </button>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>RUT</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Confiabilidad</th>
            <th>Tipos de Ropa</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(prov => (
            <tr key={prov.id}>
              <td onClick={() => setDetalle(prov)} className={styles.clickable}>{prov.nombre}</td>
              <td>{prov.rut}</td>
              <td><a href={`https://wa.me/${prov.telefono.replace("+", "")}`} target="_blank" rel="noreferrer">{prov.telefono}</a></td>
              <td>{prov.direccion}</td>
              <td><span className={styles[prov.confiabilidad.toLowerCase()]}>{prov.confiabilidad}</span></td>
              <td>
                {prov.tiposRopa.map(tipo => (
                  <span key={tipo} className={styles.chip}>{tipo}</span>
                ))}
              </td>
              <td>
                <button className={styles.actionBtn} onClick={() => { setEditing(prov); setModalOpen(true); }}>Editar</button>
                <button className={styles.actionBtn} onClick={() => handleDelete(prov.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {modalOpen &&
        <ProviderFormModal
          initialData={editing}
          onClose={() => { setModalOpen(false); fetchProveedores(); }}
        />
      }
      {detalle &&
        <ProviderDetailModal
          proveedor={detalle}
          onClose={() => setDetalle(null)}
        />
      }
    </div>
  );
}
