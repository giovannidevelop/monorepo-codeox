import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import ItemCard from "./components/cart/ItemCard";
import Cart from "./components/cart/Cart";
import "./store.scss";
import ProductModal from "./components/ProductModal";
import { endpoints } from "./../../config/api"; // ajusta la ruta si difiere

const mapProductoVm = (p) => ({
  id: p.id,
  name: p.nombre,
  description: p.descripcion,
  price: Number(p.precioVenta ?? 0),
  image: "https://picsum.photos/300/300",
  categoria: p.categoria?.nombre,
  marca: p.marca?.nombre,
  calidad: p.calidad?.nombre,
  estado: p.estadoProducto?.estado,
});

const Store = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const cargarProductos = async () => {
    setLoading(true);
    setError("");
    try {
      const url = endpoints.productos.producto.list(); // -> /api/products/productos
      const { data } = await axios.get(url);
      const productos = Array.isArray(data) ? data.map(mapProductoVm) : [];
      setProducts(productos);
    } catch (e) {
      console.error("Error al obtener productos:", e);
      setError("No se pudieron cargar los productos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const addToCart = (product) => setCart((prev) => [...prev, product]);
  const removeFromCart = (id) => setCart((prev) => prev.filter((p) => p.id !== id));

  const total = useMemo(() => cart.reduce((sum, item) => sum + (item.price || 0), 0), [cart]);

  return (
    <div className="store">
      <div className="store__header">
        <h1 className="store__title">Nuestra Tienda</h1>
        <p className="store__subtitle">Explora nuestros productos</p>
      </div>

      <section className="store__grid">
        <div className="store__cart">
          <Cart cart={cart} removeFromCart={removeFromCart} total={total} />
        </div>

        {loading ? (
          <p className="store__loading">Cargando productos...</p>
        ) : error ? (
          <div className="store__error">
            <p>{error}</p>
            <button onClick={cargarProductos}>Reintentar</button>
          </div>
        ) : products.length > 0 ? (
          products.map((p) => (
            <ItemCard
              key={p.id}
              product={p}
              addToCart={addToCart}
              viewDetails={() => setSelectedProduct(p)}
            />
          ))
        ) : (
          <p className="store__loading">No hay productos disponibles.</p>
        )}
      </section>

      {selectedProduct && (
        <ProductModal
          producto={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default Store;
