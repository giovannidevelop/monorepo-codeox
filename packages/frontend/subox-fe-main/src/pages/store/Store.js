import React, { useState } from "react";
import ProductCard from "../store/components/ProductCard";
import Cart from "../store/components/Cart";

const products = [
    { id: 1, name: "Polera Básica", price: 5000, description: "Polera de algodón, disponible en varios colores.", image: "https://picsum.photos/300/300" },
    { id: 2, name: "Jeans Clásicos", price: 15000, description: "Jeans rectos, cómodos y duraderos.", image: "https://picsum.photos/300/300" },
    { id: 3, name: "Chaqueta Casual", price: 25000, description: "Perfecta para días frescos y ocasiones informales.", image: "https://picsum.photos/300/300" },
    { id: 4, name: "Zapatos Deportivos", price: 20000, description: "Ideales para entrenar o caminar cómodamente.", image: "https://picsum.photos/300/300" },
];

const Store = () => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]);
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price, 0);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Nuestra Tienda</h1>
            <div style={styles.shop}>
                <div style={styles.products}>
                    <h2 style={styles.subtitle}>Productos</h2>
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} addToCart={addToCart} />
                    ))}
                </div>
                <Cart cart={cart} removeFromCart={removeFromCart} calculateTotal={calculateTotal} />
            </div>
        </div>
    );
};

const styles = {
    container: {
        fontFamily: "Arial, sans-serif",
        padding: "20px",
    },
    title: {
        textAlign: "center",
        fontSize: "2rem",
        marginBottom: "20px",
        color: "#2c3e50",
    },
    shop: {
        display: "flex",
        justifyContent: "space-between",
        gap: "20px",
    },
    products: {
        flex: 1,
        padding: "10px",
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    subtitle: {
        marginBottom: "15px",
        color: "#2c3e50",
    },
};

export default Store;
