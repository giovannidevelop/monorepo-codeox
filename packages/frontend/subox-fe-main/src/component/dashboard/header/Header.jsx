import React, { useState, useEffect, useRef } from "react";
import "./header.scss";
import { useSelector } from "react-redux";
import { PATH } from "../../../router/path";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const carrito = useSelector((state) => state.carrito.productos);
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navRef = useRef();

  // Cerrar menú al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isNavOpen) setIsNavOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isNavOpen]);

  // Cerrar si haces click fuera del menú
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setIsNavOpen(false);
      }
    };
    if (isNavOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isNavOpen]);

  const handleClickLogo = () => navigate(PATH.HOME);
  const toggleNav = () => setIsNavOpen(prev => !prev);

  return (
    <header className={`header ${isNavOpen ? "menu-open" : ""}`}>
      <div className="header__container">
        <div className="header__top">
          <button
            className="header__toggle"
            onClick={toggleNav}
            aria-label="Menú"
            aria-expanded={isNavOpen}
          >
            {isNavOpen ? "✕" : "☰"}
          </button>

          <div className="header__logo" onClick={handleClickLogo}>
            <img src="/logo_fashion_fardos.jpg" alt="Fashion Fardos" />
          </div>

          <nav className="header__nav-desktop">
            <Link to={PATH.HOME}>Inicio</Link>
            <Link to={PATH.STORE}>Tienda</Link>
            <Link to={PATH.INVENTORY}>Inventario</Link>
            <Link to={PATH.EVENTS}>Eventos</Link>
          </nav>

          <div className="header__icons">
            <Link to={PATH.CARRITO} className="header__carrito">
              🛒
              {carrito.length > 0 && (
                <span className="header__carrito-count">{carrito.length}</span>
              )}
            </Link>
            <Link to={PATH.PROFILE}>👨‍💼</Link>
          </div>
        </div>

        {/* Overlay + Menú móvil */}
        {isNavOpen && <div className="header__overlay" />}
        <nav ref={navRef} className={`header__nav-mobile ${isNavOpen ? "slide-down" : ""}`}>
          <Link to={PATH.HOME} onClick={toggleNav}>Inicio</Link>
          <Link to={PATH.STORE} onClick={toggleNav}>Tienda</Link>
          <Link to={PATH.INVENTORY} onClick={toggleNav}>Inventario</Link>
          <Link to={PATH.EVENTS} onClick={toggleNav}>Eventos</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
