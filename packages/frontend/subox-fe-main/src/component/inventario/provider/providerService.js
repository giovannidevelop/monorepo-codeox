// src/provider/providerService.js
import { endpoints } from "../../../config/api"; // ajusta la ruta si tu config vive en otro lado

const DEFAULT_HEADERS = { "Content-Type": "application/json" };

async function apiRequest(url, options = {}) {
  const res = await fetch(url, {
    ...options,
    headers: { ...DEFAULT_HEADERS, ...(options.headers || {}) },
  });

  const ct = res.headers.get("content-type") || "";
  if (!res.ok) {
    let msg = "Error en la API";
    try {
      msg = ct.includes("application/json") ? (await res.json()).message : await res.text();
    } catch {
      /* no-op */
    }
    throw new Error(msg || "Error en la API");
  }

  if (res.status === 204) return null;
  return ct.includes("application/json") ? res.json() : res.text();
}

export async function getProveedores() {
  return apiRequest(endpoints.productos.proveedores.list());
}

export async function addProveedor(proveedor) {
  return apiRequest(endpoints.productos.proveedores.create(), {
    method: "POST",
    body: JSON.stringify(proveedor),
  });
}

export async function updateProveedor(id, proveedor) {
  return apiRequest(endpoints.productos.proveedores.update(id), {
    method: "PUT",
    body: JSON.stringify(proveedor),
  });
}

export async function deleteProveedor(id) {
  await apiRequest(endpoints.productos.proveedores.remove(id), { method: "DELETE" });
  return true; // si no lanza error, se eliminó correctamente
}
