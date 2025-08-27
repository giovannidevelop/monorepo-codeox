import React, { useEffect, useState } from "react";
import ProveedorForm from "./ProveedorForm";
import { endpoints } from "../../../config/api"; // centraliza rutas /api

const ProveedorList = () => {
  const [proveedores, setProveedores] = useState([]);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  // Helpers API
  const apiRequest = async (url, options = {}) => {
    const res = await fetch(url, {
      headers: { "Content-Type": "application/json", ...(options.headers || {}) },
      ...options,
    });
    const ct = res.headers.get("content-type") || "";
    if (!res.ok) {
      let msg = "Error en la API";
      try {
        msg = ct.includes("application/json") ? (await res.json()).message : await res.text();
      } catch {}
      throw new Error(msg || "Error en la API");
    }
    if (res.status === 204) return null;
    return ct.includes("application/json") ? res.json() : res.text();
  };

  const loadProveedores = async () => {
    setLoading(true);
    try {
      const data = await apiRequest(endpoints.productos.proveedores.list());
      setProveedores(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProveedores();
  }, []);

  const filtered = proveedores.filter((p) =>
    `${p?.nombre ?? ""}${p?.rut ?? ""}${p?.telefono ?? ""}${p?.direccion ?? ""}${p?.confiabilidad ?? ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleSave = async (form) => {
    if (editing) {
      // UPDATE
      const updated = await apiRequest(endpoints.productos.proveedores.update(form.id), {
        method: "PUT",
        body: JSON.stringify(form),
      });
      setProveedores((prev) => prev.map((p) => (p.id === form.id ? (updated || form) : p)));
      setEditing(null);
    } else {
      // CREATE
      const created = await apiRequest(endpoints.productos.proveedores.create(), {
        method: "POST",
        body: JSON.stringify(form),
      });
      setProveedores((prev) => [...prev, created || form]);
      setAdding(false);
    }
  };

  const handleEdit = (item) => setEditing(item);

  const handleDelete = async (id) => {
    await apiRequest(endpoints.productos.proveedores.remove(id), { method: "DELETE" });
    setProveedores((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div>
      <h2>Proveedores</h2>

      <input
        placeholder="Buscar proveedor..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: 10, padding: 6, borderRadius: 4, width: 250 }}
      />

      {editing || adding ? (
        <ProveedorForm
          initialData={editing}
          onSave={handleSave}
          onCancel={() => {
            setEditing(null);
            setAdding(false);
          }}
        />
      ) : (
        <button onClick={() => setAdding(true)}>Agregar Proveedor</button>
      )}

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table border="1" cellPadding="8" width="100%">
          <thead style={{ backgroundColor: "#f4f4f4" }}>
            <tr>
              <th>ID</th>
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
            {filtered.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nombre}</td>
                <td>{p.rut}</td>
                <td>{p.telefono}</td>
                <td>{p.direccion}</td>
                <td>{p.confiabilidad}</td>
                <td>{Array.isArray(p.tiposRopa) ? p.tiposRopa.join(", ") : ""}</td>
                <td>
                  <button onClick={() => handleEdit(p)}>Editar</button>
                  <button onClick={() => handleDelete(p.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", color: "#999" }}>
                  Sin resultados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProveedorList;
