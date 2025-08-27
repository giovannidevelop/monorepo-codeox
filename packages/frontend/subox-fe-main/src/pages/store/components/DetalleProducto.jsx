import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./detalleProducto.scss";
import { endpoints } from "../../../config/api"; // ajusta la ruta si difiere

const DetalleProducto = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const fetchProducto = async () => {
      try {
        const url = endpoints.productos.producto.byId(id); // -> /api/products/productos/:id
        const { data } = await axios.get(url);
        if (mounted) setProducto(data);
      } catch (e) {
        console.error("Error al obtener producto:", e);
        if (mounted) setError("No se pudo cargar el producto.");
      }
    };

    fetchProducto();
    return () => { mounted = false; };
  }, [id]);

  if (error) return <p style={{ color: "crimson" }}>{error}</p>;
  if (!producto) return <p>Cargando producto...</p>;

  return (
    <div className="detalle-producto">
      <Link to="/">← Volver</Link>
      <h2>{producto.nombre}</h2>
      <img src="https://picsum.photos/300/300" alt={producto.nombre} />
      <p><strong>Descripción:</strong> {producto.descripcion}</p>
      <p><strong>Precio:</strong> ${Number(producto.precioVenta ?? 0).toLocaleString()}</p>
      <p><strong>Stock:</strong> {producto.stock}</p>
      <p><strong>Categoría:</strong> {producto.categoria?.nombre}</p>
      <p><strong>Marca:</strong> {producto.marca?.nombre}</p>
      <p><strong>Calidad:</strong> {producto.calidad?.nombre}</p>
      <p><strong>Estado:</strong> {producto.estadoProducto?.estado}</p>
    </div>
  );
};

export default DetalleProducto;
