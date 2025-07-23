import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import ItemCard from "./components/cart/ItemCard";
import Cart from "./components/cart/Cart";
import "./store.scss";
import ProductModal from "./components/ProductModal";

const Store = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null); // para ver detalles

    useEffect(() => {
        axios.get("http://localhost:7003/productos")
            .then(res => {
                const productos = res.data.map(p => ({
                    id: p.id,
                    name: p.nombre,
                    description: p.descripcion,
                    price: p.precioVenta,
                    image: "https://picsum.photos/300/300",
                    categoria: p.categoria?.nombre,
                    marca: p.marca?.nombre,
                    calidad: p.calidad?.nombre,
                    estado: p.estadoProducto?.estado
                }));
                setProducts(productos);
            })
            .catch(error => {
                console.error("Error al obtener productos:", error);
            });
    }, []);

    const addToCart = (product) => setCart((prev) => [...prev, product]);
    const removeFromCart = (id) => setCart((prev) => prev.filter((p) => p.id !== id));

    const total = useMemo(
        () => cart.reduce((sum, item) => sum + item.price, 0),
        [cart]
    );

    const handleViewDetails = (product) => {
        setSelectedProduct(product);
    };
 const cargarProductos = () => {
        axios.get("http://localhost:7003/productos")
            .then(res => {
                const productos = res.data.map(p => ({
                    id: p.id,
                    name: p.nombre,
                    description: p.descripcion,
                    price: p.precioVenta,
                    image: "https://picsum.photos/300/300",
                    categoria: p.categoria?.nombre,
                    marca: p.marca?.nombre,
                    calidad: p.calidad?.nombre,
                    estado: p.estadoProducto?.estado
                }));
                setProducts(productos);
            });
    };

    useEffect(() => {
        cargarProductos();
    }, []);

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
                {products.length > 0 ? (
                    products.map((p) => (
                        <ItemCard
                            key={p.id}
                            product={p}
                            addToCart={addToCart}
                            viewDetails={() => handleViewDetails(p)}
                        />
                    ))
                ) : (
                    <p className="store__loading">Cargando productos...</p>
                )}
            </section>

            {/* Modal de detalle */}
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
