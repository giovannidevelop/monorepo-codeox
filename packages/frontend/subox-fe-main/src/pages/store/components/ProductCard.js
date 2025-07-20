import React from "react";

const ProductCard = ({ product, addToCart, viewDetails }) => (
  <article className="card">
    <img src={product.image} alt={product.name} className="card__img" />
    <div className="card__body">
      <p className="card__price">${product.price}</p>
      <p className="card__name">{product.name}</p>
      <button onClick={() => addToCart(product)}>Agregar</button>
       <button onClick={() => viewDetails(product)}>Ver detalles</button>
    </div>
  </article>
);

export default ProductCard;
