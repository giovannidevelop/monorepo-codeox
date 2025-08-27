// src/app/redux/actions/clientesApi.js  (o donde lo tengas)
import { endpoints } from "../../../../config/api";

const DEFAULT_HEADERS = { "Content-Type": "application/json" };

async function request(url, options = {}) {
  // Merge de headers sin perder los que te pasen
  const res = await fetch(url, {
    ...options,
    headers: { ...DEFAULT_HEADERS, ...(options.headers || {}) },
  });

  const ct = res.headers.get("content-type") || "";

  if (!res.ok) {
    let payload;
    try {
      payload = ct.includes("application/json") ? await res.json() : await res.text();
    } catch {
      payload = null;
    }
    const message =
      (payload && (payload.message || payload.error)) ||
      (typeof payload === "string" ? payload : "Error en la API");
    throw new Error(message);
  }

  if (res.status === 204) return null;     // No Content
  if (ct.includes("application/json")) return res.json();
  return res.text();                        // fallback por si devuelven texto
}

/* =========================
   Clientes (usa config/api)
   ========================= */
export function getClientes() {
  return request(endpoints.clientes.list());
}

export function createCliente(cliente) {
  return request(endpoints.clientes.create(), {
    method: "POST",
    body: JSON.stringify(cliente),
  });
}

export function updateCliente(id, cliente) {
  return request(endpoints.clientes.update(id), {
    method: "PUT",
    body: JSON.stringify(cliente),
  });
}

export function deleteCliente(id) {
  return request(endpoints.clientes.remove(id), {
    method: "DELETE",
  });
}

// (Opcional) export estilo objeto
export const ClienteApi = {
  list: getClientes,
  create: createCliente,
  update: updateCliente,
  remove: deleteCliente,
};
