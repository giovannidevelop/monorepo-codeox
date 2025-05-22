// src/provider/providerService.js

const API_URL = "http://localhost:3001/proveedores";

export async function getProveedores() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function addProveedor(proveedor) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(proveedor),
  });
  return res.json();
}

export async function updateProveedor(id, proveedor) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(proveedor),
  });
  return res.json();
}

export async function deleteProveedor(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });
  return res.ok;
}
