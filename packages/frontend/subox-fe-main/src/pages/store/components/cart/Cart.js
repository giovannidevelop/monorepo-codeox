import React from "react";
import "./cart.scss"

const Cart = ({ cart, removeFromCart, total }) => (
  <aside className="cart">
    <h2>Carrito</h2>

    {cart.length === 0 ? (
      <p>Tu carrito está vacío.</p>
    ) : (
      <>
        {cart.map((item) => (
          <div key={item.id} className="cart__item">
            <span>{item.name}</span>
            <button onClick={() => removeFromCart(item.id)}>X</button>
          </div>
        ))}
        <p className="cart__total">
          <strong>Total:</strong> ${total}
        </p>
      </>
    )}
  </aside>
);

export default Cart;
