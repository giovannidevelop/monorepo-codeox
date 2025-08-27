// src/config/api.js
// Única fuente de verdad de URLs del API (vía API Gateway).
// Lee REACT_APP_* en build; trae defaults seguros si no están.
// *** No pongas http://localhost:7000 aquí: siempre /api -> gateway ***

const stripTrailing = (s) => String(s || "").replace(/\/+$/, "");
const stripLeading = (s) => String(s || "").replace(/^\/+/, "");
const join = (base, path = "") => `${stripTrailing(base)}/${stripLeading(path)}`;

// ===== Bases =====
export const API_BASE = stripTrailing(process.env.REACT_APP_API_BASE || "/api");
export const API_AUTH = stripTrailing(process.env.REACT_APP_API_AUTH || join(API_BASE, "auth"));
export const API_CLIENTES = stripTrailing(process.env.REACT_APP_API_CLIENTES || join(API_BASE, "clientes"));
export const API_UBICACIONES = stripTrailing(process.env.REACT_APP_API_UBICACIONES || join(API_BASE, "ubicaciones"));
export const API_PAYMENTS = stripTrailing(process.env.REACT_APP_API_PAYMENTS || join(API_BASE, "payments"));
export const API_MAIL = stripTrailing(process.env.REACT_APP_API_MAIL || join(API_BASE, "mail"));
export const API_PRODUCTS = stripTrailing(process.env.REACT_APP_API_PRODUCTS || join(API_BASE, "products"));
// Vendedor Supremo (el gateway reescribe /api/webhooks/vendedor-supremo -> servicio)
export const API_VS = stripTrailing(process.env.REACT_APP_API_VS || join(API_BASE, "webhooks/vendedor-supremo"));

// ===== Helpers =====
export const url = (base, path = "") => join(base, path);
export const q = (params) => {
  const sp = new URLSearchParams(params ?? {});
  const s = sp.toString();
  return s ? `?${s}` : "";
};

// ===================================================================================
// AUTH  (/api/auth/…)
// Controller: AuthController
// ===================================================================================
export const auth = {
  base: API_AUTH,
  register: () => url(API_AUTH, "registrar"),                     // POST
  login: () => url(API_AUTH, "login"),                         // POST
  updateProfile: () => url(API_AUTH, "users/update-profile"),
  resendActivationLink: (usernameOrEmail) =>
    url(API_AUTH, `resend-activation-link${q({ usernameOrEmail })}`), // POST (x-www-form-urlencoded o JSON según tu FE)
  verifyEmail: (token) => url(API_AUTH, `verify-email${q({ token })}`), // GET
};

// ===================================================================================
// CLIENTES  (/api/clientes/…)
// Controller: ClienteController
// ===================================================================================
export const clientes = {
  base: API_CLIENTES,
  list: () => API_CLIENTES,               // GET
  create: () => API_CLIENTES,               // POST
  update: (id) => url(API_CLIENTES, id),    // PUT
  remove: (id) => url(API_CLIENTES, id),    // DELETE
};

// ===================================================================================
// UBICACIONES  (/api/ubicaciones/…)
// Controller: UbicacionController
// ===================================================================================
export const ubicaciones = {
  base: API_UBICACIONES,
  list: () => API_UBICACIONES,                     // GET
  create: () => API_UBICACIONES,                     // POST
  update: (id) => url(API_UBICACIONES, id),          // PUT
  remove: (id) => url(API_UBICACIONES, id),          // DELETE

  regiones: () => url(API_UBICACIONES, "regiones"),                 // GET
  provinciasByRegion: (regionId) => url(API_UBICACIONES, `provincias${q({ regionId })}`), // GET
  comunasByProvincia: (provinciaId) => url(API_UBICACIONES, `comunas${q({ provinciaId })}`), // GET
};

// ===================================================================================
// PAYMENTS / FLOW  (/api/payments/flow/…)
// Controller: PaymentFlowController
// ===================================================================================
const FLOW_BASE = url(API_PAYMENTS, "flow");
export const payments = {
  base: API_PAYMENTS,
  flow: {
    base: FLOW_BASE,
    createOrder: () => url(FLOW_BASE, "create-order"),     // POST (JSON)
    confirmation: (token) => url(FLOW_BASE, `confirmation${q({ token })}`), // POST (form-urlencoded)
    returnPage: (token) => url(FLOW_BASE, `return${q({ token })}`),       // POST (form-urlencoded) -> 302 al front
    statusByOrder: (commerceOrder) => url(FLOW_BASE, `status/${encodeURIComponent(commerceOrder)}`), // GET
    statusByToken: (token) => url(FLOW_BASE, `status-by-token${q({ token })}`), // GET
  },
};

// ===================================================================================
// MAIL  (/api/mail/…)
// Controller: MailController
// ===================================================================================
export const mail = {
  base: API_MAIL,
  send: () => url(API_MAIL, "send"), // POST
};

// ===================================================================================
// PRODUCTOS  (ATENCIÓN: bajo gateway es /api/products/… y el micro mapea en raíz)
// Controllers: CalidadController, CategoriaController, EstadoProductoController,
//              MarcaController, ProductoController
// ===================================================================================
export const productos = {
  base: API_PRODUCTS,
  fardosDirectos: {
    list: () => url(API_PRODUCTS, "fardos-directos"),                           // GET
    create: () => url(API_PRODUCTS, "fardos-directos"),                           // POST  (opcional)
    update: (id) => url(API_PRODUCTS, `fardos-directos/${id}`),                   // PUT   (opcional)
    sell: (id) => url(API_PRODUCTS, `fardos-directos/${id}/sell`),              // POST
    createArmado: (id) => url(API_PRODUCTS, `fardos-directos/${id}/armados`),           // POST  { ... }
    sellArmado: (id, armadoId) => url(API_PRODUCTS, `fardos-directos/${id}/armados/${armadoId}/sell`), // POST
  },
  // --- Calidades ---
  calidades: {
    list: () => url(API_PRODUCTS, "calidades"), // GET
    create: () => url(API_PRODUCTS, "calidades"), // POST
  },

  // --- Categorías ---
  categorias: {
    list: () => url(API_PRODUCTS, "categorias"),           // GET
    create: () => url(API_PRODUCTS, "categorias"),           // POST
    byId: (id) => url(API_PRODUCTS, `categorias/${id}`),   // GET
    update: (id) => url(API_PRODUCTS, `categorias/${id}`),   // PUT
    patchNombre: (id, nombre) => url(API_PRODUCTS, `categorias/${id}/nombre${q({ nombre })}`), // PATCH
    patchDescripcion: (id, descripcion) => url(API_PRODUCTS, `categorias/${id}/descripcion${q({ descripcion })}`), // PATCH
    remove: (id) => url(API_PRODUCTS, `categorias/${id}`),   // DELETE
  },

  // --- EstadoProducto ---
  estadoProductos: {
    list: () => url(API_PRODUCTS, "estadoProductos"), // GET
    create: () => url(API_PRODUCTS, "estadoProductos"), // POST
  },

  // --- Marcas ---
  marcas: {
    list: () => url(API_PRODUCTS, "marcas"), // GET
    create: () => url(API_PRODUCTS, "marcas"), // POST
  },

  // --- Productos (CRUD + extras) ---
  producto: {
    create: () => url(API_PRODUCTS, "productos"),                // POST
    update: (id) => url(API_PRODUCTS, `productos/${id}`),        // PUT
    remove: (id) => url(API_PRODUCTS, `productos/${id}`),        // DELETE
    list: () => url(API_PRODUCTS, "productos"),                // GET
    byId: (id) => url(API_PRODUCTS, `productos/${id}`),        // GET
    buscarPorNombre: (nombre) => url(API_PRODUCTS, `productos/buscar${q({ nombre })}`),   // GET
    porCategoria: (categoriaId) => url(API_PRODUCTS, `productos/categoria/${categoriaId}`), // GET
    stockMenorA: (cantidad) => url(API_PRODUCTS, `productos/stock/menor-a${q({ cantidad })}`), // GET
    patchStock: (id, cantidad) => url(API_PRODUCTS, `productos/${id}/stock${q({ cantidad })}`), // PATCH
    patchPrecio: (id, precio) => url(API_PRODUCTS, `productos/${id}/precio${q({ precio })}`), // PATCH

    registrarEntrada: (id, cantidad, motivo) => url(API_PRODUCTS, `productos/${id}/entrada${q({ cantidad, motivo })}`), // POST
    registrarSalida: (id, cantidad, motivo) => url(API_PRODUCTS, `productos/${id}/salida${q({ cantidad, motivo })}`),  // POST
  },
  ventas: { list: () => url(API_PRODUCTS, "ventas") },
  proveedores: {
    list: () => url(API_PRODUCTS, "proveedores"),
    create: () => url(API_PRODUCTS, "proveedores"),
    update: (id) => url(API_PRODUCTS, `proveedores/${id}`),
    remove: (id) => url(API_PRODUCTS, `proveedores/${id}`),
  },
};

// ===================================================================================
// Vendedor Supremo Webhook  (/api/webhooks/vendedor-supremo/…)
// OJO: Tu controller usa @RequestMapping("/api/tracker"), por lo que a través del
// gateway queda expuesto como: /api/webhooks/vendedor-supremo/api/tracker/...
// ===================================================================================
const VS_TRACKER_BASE = url(API_VS, "api/tracker");
export const vs = {
  base: API_VS,
  tracker: {
    base: VS_TRACKER_BASE,
    trackEvent: () => url(VS_TRACKER_BASE, "events"),                   // POST
    listChats: (status = "open") => url(VS_TRACKER_BASE, `chats${q({ status })}`), // GET
    funnel: () => url(VS_TRACKER_BASE, "funnel"),                   // GET
  },
};

// ===================================================================================
// Exporte agrupado opcional
// ===================================================================================
export const endpoints = { auth, clientes, ubicaciones, payments, mail, productos, vs };
