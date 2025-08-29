// src/app/api/productosApi.js
import { endpoints } from "../../../../config/api";

const DEFAULT_HEADERS = { "Content-Type": "application/json" };

async function request(url, options = {}) {
  const res = await fetch(url, {
    ...options,
    headers: { ...DEFAULT_HEADERS, ...(options.headers || {}) },
  });

  const ct = res.headers.get("content-type") || "";

  if (!res.ok) {
    let payload;
    try {
      payload = ct.includes("application/json") ? await res.json() : await res.text();
    } catch {}
    const message =
      (payload && (payload.message || payload.error)) ||
      (typeof payload === "string" ? payload : "Error en la API");
    throw new Error(message);
  }

  if (res.status === 204) return null; // No Content
  return ct.includes("application/json") ? res.json() : res.text();
}

/* =========================
   Productos (CRUD + extras)
   ========================= */
export const ProductoApi = {
  list: () => request(endpoints.productos.producto.list()),
  byId: (id) => request(endpoints.productos.producto.byId(id)),
  create: (producto) =>
    request(endpoints.productos.producto.create(), {
      method: "POST",
      body: JSON.stringify(producto),
    }),
  update: (id, producto) =>
    request(endpoints.productos.producto.update(id), {
      method: "PUT",
      body: JSON.stringify(producto),
    }),
  remove: (id) =>
    request(endpoints.productos.producto.remove(id), {
      method: "DELETE",
    }),

  // Extras
  buscarPorNombre: (nombre) =>
    request(endpoints.productos.producto.buscarPorNombre(nombre)),
  porCategoria: (categoriaId) =>
    request(endpoints.productos.producto.porCategoria(categoriaId)),
  stockMenorA: (cantidad) =>
    request(endpoints.productos.producto.stockMenorA(cantidad)),

  patchStock: (id, cantidad) =>
    request(endpoints.productos.producto.patchStock(id, cantidad), {
      method: "PATCH",
    }),
  patchPrecio: (id, precio) =>
    request(endpoints.productos.producto.patchPrecio(id, precio), {
      method: "PATCH",
    }),

  registrarEntrada: (id, cantidad, motivo) =>
    request(endpoints.productos.producto.registrarEntrada(id, cantidad, motivo), {
      method: "POST",
    }),
  registrarSalida: (id, cantidad, motivo) =>
    request(endpoints.productos.producto.registrarSalida(id, cantidad, motivo), {
      method: "POST",
    }),
};

/* =========================
   Catálogos (para selects)
   ========================= */
export const CatalogoApi = {
  categorias: {
    list: () => request(endpoints.productos.categorias.list()),
    create: (data) =>
      request(endpoints.productos.categorias.create(), {
        method: "POST",
        body: JSON.stringify(data),
      }),
    byId: (id) => request(endpoints.productos.categorias.byId(id)),
    update: (id, data) =>
      request(endpoints.productos.categorias.update(id), {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    remove: (id) =>
      request(endpoints.productos.categorias.remove(id), { method: "DELETE" }),
  },
  marcas: {
    list: () => request(endpoints.productos.marcas.list()),
    create: (data) =>
      request(endpoints.productos.marcas.create(), {
        method: "POST",
        body: JSON.stringify(data),
      }),
  },
  calidades: {
    list: () => request(endpoints.productos.calidades.list()),
    create: (data) =>
      request(endpoints.productos.calidades.create(), {
        method: "POST",
        body: JSON.stringify(data),
      }),
  },
  estados: {
    list: () => request(endpoints.productos.estadoProductos.list()),
    create: (data) =>
      request(endpoints.productos.estadoProductos.create(), {
        method: "POST",
        body: JSON.stringify(data),
      }),
  },
};
