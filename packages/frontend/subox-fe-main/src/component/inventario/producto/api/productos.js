
const BASE_URL = (process.env.REACT_APP_API_URL || '').replace(/\/+$/, '');

async function request(path, options = {}) {
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

  // Si la respuesta es 204 No Content, no intentamos convertirla a JSON
  if (res.status === 204) {
    return null; // Retornar null cuando la respuesta no tiene contenido
  }

  return res.json(); // Si la respuesta tiene contenido, procesarla como JSON
}


export function getClientes() {
  return request('/productos');
}
export function createCliente(producto) {
  return request('/productos', {
    method: 'POST',
    body: JSON.stringify(producto),
  });
}
export function updateCliente(id, producto) {
  return request(`/productos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(producto),
  });
}
export function deleteCliente(id) {
  return request(`/productos/${id}`, {
    method: 'DELETE',
  }).catch((err) => {
    console.error('Error al eliminar producto:', err); // Aquí vemos el error completo
    throw err; // Vuelve a lanzar el error para que sea manejado en el frontend
  });
}

