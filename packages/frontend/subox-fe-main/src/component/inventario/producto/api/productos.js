// src/app/api/productosApi.js  (o donde lo tengas)
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

  if (res.status === 204) return null;                 // No Content
  return ct.includes("application/json") ? res.json() : res.text();
}

/* =========================
   Productos (CRUD + extras)
   ========================= */
export function getProductos() {
  return request(endpoints.productos.producto.list());
}

export function createProducto(producto) {
  return request(endpoints.productos.producto.create(), {
    method: "POST",
    body: JSON.stringify(producto),
  });
}

export function updateProducto(id, producto) {
  return request(endpoints.productos.producto.update(id), {
    method: "PUT",
    body: JSON.stringify(producto),
  });
}

export function deleteProducto(id) {
  return request(endpoints.productos.producto.remove(id), {
    method: "DELETE",
  });
}

/* ---------- Extras opcionales ya mapeados ---------- */
export function getProductoById(id) {
  return request(endpoints.productos.producto.byId(id));
}

export function buscarProductosPorNombre(nombre) {
  return request(endpoints.productos.producto.buscarPorNombre(nombre));
}

export function productosPorCategoria(categoriaId) {
  return request(endpoints.productos.producto.porCategoria(categoriaId));
}

export function productosConStockMenorA(cantidad) {
  return request(endpoints.productos.producto.stockMenorA(cantidad));
}

export function patchStockProducto(id, cantidad) {
  return request(endpoints.productos.producto.patchStock(id, cantidad), {
    method: "PATCH",
  });
}

export function patchPrecioProducto(id, precio) {
  return request(endpoints.productos.producto.patchPrecio(id, precio), {
    method: "PATCH",
  });
}

export function registrarEntradaInventario(id, cantidad, motivo) {
  return request(endpoints.productos.producto.registrarEntrada(id, cantidad, motivo), {
    method: "POST",
  });
}

export function registrarSalidaInventario(id, cantidad, motivo) {
  return request(endpoints.productos.producto.registrarSalida(id, cantidad, motivo), {
    method: "POST",
  });
}

/* Export agrupado si te sirve */
export const ProductoApi = {
  list: getProductos,
  create: createProducto,
  update: updateProducto,
  remove: deleteProducto,
  byId: getProductoById,
  buscarPorNombre: buscarProductosPorNombre,
  porCategoria: productosPorCategoria,
  stockMenorA: productosConStockMenorA,
  patchStock: patchStockProducto,
  patchPrecio: patchPrecioProducto,
  registrarEntrada: registrarEntradaInventario,
  registrarSalida: registrarSalidaInventario,
};
