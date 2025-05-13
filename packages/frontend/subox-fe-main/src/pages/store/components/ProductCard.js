import React from "react";

const ProductCard = ({ product, addToCart }) => {
    return (
        <div style={styles.card}>
            <img src={product.image} alt={product.name} style={styles.image} />
            <h3 style={styles.name}>{product.name}</h3>
            <p style={styles.description}>{product.description}</p>
            <p style={styles.price}>Precio: ${product.price}</p>
            <button style={styles.button} onClick={() => addToCart(product)}>
                Añadir al Carrito
            </button>
        </div>
    );
};

const styles = {
    card: {
        padding: "15px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
        backgroundColor: "#fff",
    },
    image: {
        width: "300px",
        scale: "0.5",
        height: "300px",
        objectFit: "cover",
        borderRadius: "10px",
    },
    name: {
        fontSize: "1.2rem",
        color: "#2c3e50",
    },
    description: {
        fontSize: "0.9rem",
        color: "#7f8c8d",
        margin: "10px 0",
    },
    price: {
        fontSize: "1rem",
        color: "#27ae60",
        fontWeight: "bold",
    },
    button: {
        backgroundColor: "#3498db",
        color: "#fff",
        padding: "8px 12px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginTop: "10px",
    },
};

export default ProductCard;
