import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./detalleProducto.scss";

const DetalleProducto = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:7003/productos/${id}`)
      .then(res => setProducto(res.data))
      .catch(err => console.error("Error al obtener producto:", err));
  }, [id]);

  if (!producto) return <p>Cargando producto...</p>;

  return (
    <div className="detalle-producto">
      <Link to="/">← Volver</Link>
      <h2>{producto.nombre}</h2>
      <img src="https://picsum.photos/300/300" alt={producto.nombre} />
      <p><strong>Descripción:</strong> {producto.descripcion}</p>
      <p><strong>Precio:</strong> ${producto.precioVenta}</p>
      <p><strong>Stock:</strong> {producto.stock}</p>
      <p><strong>Categoría:</strong> {producto.categoria?.nombre}</p>
      <p><strong>Marca:</strong> {producto.marca?.nombre}</p>
      <p><strong>Calidad:</strong> {producto.calidad?.nombre}</p>
      <p><strong>Estado:</strong> {producto.estadoProducto?.estado}</p>
    </div>
  );
};

export default DetalleProducto;
