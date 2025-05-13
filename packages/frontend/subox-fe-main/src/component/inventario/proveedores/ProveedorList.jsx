import React, { useEffect, useState } from "react";
import ProveedorForm from "./ProveedorForm";

const ProveedorList = () => {
  const [proveedores, setProveedores] = useState([]);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    fetch("/data/proveedores.json")
      .then((res) => res.json())
      .then((data) => setProveedores(data));
  }, []);

  const filtered = proveedores.filter((p) =>
    (p.nombre + p.rut + p.telefono + p.direccion + p.confiabilidad)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleSave = (form) => {
    if (editing) {
      setProveedores((prev) =>
        prev.map((p) => (p.id === form.id ? form : p))
      );
      setEditing(null);
    } else {
      const newId =
        proveedores.length > 0
          ? Math.max(...proveedores.map((p) => p.id)) + 1
          : 1;
      setProveedores([...proveedores, { ...form, id: newId }]);
      setAdding(false);
    }
  };

  const handleEdit = (item) => setEditing(item);
  const handleDelete = (id) =>
    setProveedores((prev) => prev.filter((p) => p.id !== id));

  return (
    <div>
      <h2>Proveedores</h2>
      <input
        placeholder="Buscar proveedor..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          marginBottom: "10px",
          padding: "6px",
          borderRadius: "4px",
          width: "250px"
        }}
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
              <td>{p.tiposRopa.join(", ")}</td>
              <td>
                <button onClick={() => handleEdit(p)}>Editar</button>
                <button onClick={() => handleDelete(p.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProveedorList;