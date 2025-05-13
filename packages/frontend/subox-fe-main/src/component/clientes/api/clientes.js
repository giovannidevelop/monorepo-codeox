// src/api/clientes.js

// 1) CRA carga esta variable desde .env.development / .env.production
//    Si está vacía, BASE_URL = '' y usamos rutas relativas.
const BASE_URL = (process.env.REACT_APP_CLIENTES_API_URL || '').replace(/\/+$/, '');

async function request(path, options = {}) {
  // 2) Asegúrate de que `path` empiece con "/"
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const url = `${BASE_URL}${cleanPath}`;

  console.log('Fetching:', url);

  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Error en la API');
  }
  return res.json();
}

export function getClientes() {
  return request('/api/clientes');
}
export function createCliente(cliente) {
  return request('/api/clientes', {
    method: 'POST',
    body: JSON.stringify(cliente),
  });
}
export function updateCliente(id, cliente) {
  return request(`/api/clientes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(cliente),
  });
}
export function deleteCliente(id) {
  return request(`/api/clientes/${id}`, {
    method: 'DELETE',
  });
}
