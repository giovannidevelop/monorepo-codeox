import React, { useState, useMemo } from "react";
import ProductCard from "../store/components/ProductCard";
import Cart from "../store/components/Cart";
import "./store.scss";

const products = [
    { id: 1, name: "Polera Básica", price: 5000, description: "Polera de algodón, disponible en varios colores.", image: "https://picsum.photos/300/300" },
    { id: 2, name: "Jeans Clásicos", price: 15000, description: "Jeans rectos, cómodos y duraderos.", image: "https://picsum.photos/300/300" },
    { id: 3, name: "Chaqueta Casual", price: 25000, description: "Perfecta para días frescos y ocasiones informales.", image: "https://picsum.photos/300/300" },
    { id: 4, name: "Zapatos Deportivos", price: 20000, description: "Ideales para entrenar o caminar cómodamente.", image: "https://picsum.photos/300/300" },
    { id: 5, name: "Polera Básica", price: 5000, description: "Polera de algodón, disponible en varios colores.", image: "https://picsum.photos/300/300" },
    { id: 6, name: "Jeans Clásicos", price: 15000, description: "Jeans rectos, cómodos y duraderos.", image: "https://picsum.photos/300/300" },
    { id: 7, name: "Chaqueta Casual", price: 25000, description: "Perfecta para días frescos y ocasiones informales.", image: "https://picsum.photos/300/300" },
    { id: 8, name: "Zapatos Deportivos", price: 20000, description: "Ideales para entrenar o caminar cómodamente.", image: "https://picsum.photos/300/300" },
    { id: 9, name: "Polera Básica", price: 5000, description: "Polera de algodón, disponible en varios colores.", image: "https://picsum.photos/300/300" },
    { id: 10, name: "Jeans Clásicos", price: 15000, description: "Jeans rectos, cómodos y duraderos.", image: "https://picsum.photos/300/300" },
    { id: 11, name: "Chaqueta Casual", price: 25000, description: "Perfecta para días frescos y ocasiones informales.", image: "https://picsum.photos/300/300" },
    { id: 12, name: "Zapatos Deportivos", price: 20000, description: "Ideales para entrenar o caminar cómodamente.", image: "https://picsum.photos/300/300" },
    { id: 13, name: "Polera Básica", price: 5000, description: "Polera de algodón, disponible en varios colores.", image: "https://picsum.photos/300/300" },
    { id: 14, name: "Jeans Clásicos", price: 15000, description: "Jeans rectos, cómodos y duraderos.", image: "https://picsum.photos/300/300" },
    { id: 15, name: "Chaqueta Casual", price: 25000, description: "Perfecta para días frescos y ocasiones informales.", image: "https://picsum.photos/300/300" },
    { id: 16, name: "Zapatos Deportivos", price: 20000, description: "Ideales para entrenar o caminar cómodamente.", image: "https://picsum.photos/300/300" },
    { id: 17, name: "Polera Básica", price: 5000, description: "Polera de algodón, disponible en varios colores.", image: "https://picsum.photos/300/300" },
    { id: 18, name: "Jeans Clásicos", price: 15000, description: "Jeans rectos, cómodos y duraderos.", image: "https://picsum.photos/300/300" },
    { id: 19, name: "Chaqueta Casual", price: 25000, description: "Perfecta para días frescos y ocasiones informales.", image: "https://picsum.photos/300/300" },
    { id: 20, name: "Zapatos Deportivos", price: 20000, description: "Ideales para entrenar o caminar cómodamente.", image: "https://picsum.photos/300/300" },
];

const Store = () => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => setCart((prev) => [...prev, product]);
    const removeFromCart = (id) => setCart((prev) => prev.filter((p) => p.id !== id));

    const total = useMemo(
        () => cart.reduce((sum, item) => sum + item.price, 0),
        [cart]
    );

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
                {products.map((p) => (
                    <ProductCard key={p.id} product={p} addToCart={addToCart} />
                ))}
            </section>

        </div>
    );
};

export default Store;
