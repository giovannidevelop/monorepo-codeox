// src/component/header/Header.jsx

import React from "react";
import "./header.scss";
import { useSelector } from "react-redux";
import { PATH } from "../../../router/path";
import { Link } from "react-router-dom"
const Header = () => {
    const carrito = useSelector((state) => state.carrito.productos);

    return (
        <header className="header">
            <div className="header__container">
                {/* Logo */}
                <div className="header__logo">
                    <img src="/logo_fashion_fardos.svg" alt="Fashion Fardos" />
                </div>

                {/* Navegación principal */}
                <nav className="header__nav">
                    <Link to={PATH.HOME}>Inicio</Link>
                    <Link to={PATH.STORE}>Tienda</Link>
                    <Link to={PATH.INVENTORY}>Inventario</Link>
                    <Link to={PATH.EVENTS}>Eventos</Link>
                </nav>

                {/* Iconos */}
                <div className="header__icons">
                    <input type="text" placeholder="Buscar..." className="header__search" />
                    <Link to={PATH.CARRITO} className="header__carrito">
                        🛒
                        {carrito.length > 0 && (
                            <span className="header__carrito-count">{carrito.length}</span>
                        )}
                    </Link>
                    <Link to={PATH.PROFILE}>👤</Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
