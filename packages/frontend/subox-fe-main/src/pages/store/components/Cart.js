import React from "react";

const Cart = ({ cart, removeFromCart, calculateTotal }) => {
    return (
        <div style={styles.cart}>
            <h2 style={styles.subtitle}>Carrito</h2>
            {cart.length === 0 ? (
                <p>Tu carrito está vacío.</p>
            ) : (
                <div>
                    {cart.map((item) => (
                        <div key={item.id} style={styles.cartItem}>
                            <span>{item.name}</span>
                            <button style={styles.removeButton} onClick={() => removeFromCart(item.id)}>X</button>
                        </div>
                    ))}
                    <p><strong>Total:</strong> ${calculateTotal()}</p>
                </div>
            )}
        </div>
    );
};

const styles = {
    cart: {
        padding: "15px",
        backgroundColor: "#f9f9f9",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    cartItem: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 0",
        borderBottom: "1px solid #ccc",
    },
    removeButton: {
        backgroundColor: "#e74c3c",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        padding: "4px 8px",
        cursor: "pointer",
    },
    subtitle: {
        marginBottom: "15px",
        color: "#2c3e50",
    },
};

export default Cart;
