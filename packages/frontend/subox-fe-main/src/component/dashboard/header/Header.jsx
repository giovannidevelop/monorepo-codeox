import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { PATH } from "./../../../router/path";
import { useAuth } from "./../../../provider/AuthProvider";
import "./header.scss";

const Header = () => {
  const carrito = useSelector((state) => state.carrito.productos);
  const { isAuthenticated, user, handleLogout } = useAuth();
  const navigate = useNavigate();
  
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  
  const navRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      if (isNavOpen) setIsNavOpen(false);
      if (isDropdownOpen) setDropdownOpen(false);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isNavOpen, isDropdownOpen]);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setIsNavOpen(false);
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <header className={`header ${isNavOpen ? "menu-open" : ""}`}>
      <div className="header__container">
        <div className="header__top">
          <button
            className="header__toggle"
            onClick={() => setIsNavOpen((prev) => !prev)}
            aria-label="Menú"
            aria-expanded={isNavOpen}
          >
            {isNavOpen ? "✕" : "☰"}
          </button>

          <div className="header__logo" onClick={() => navigate(PATH.HOME)}>
            <img src="/logo_fashion_fardos.jpg" alt="Fashion Fardos" />
          </div>

          <nav className="header__nav-desktop">
            <Link to={PATH.HOME}>Inicio</Link>
            <Link to={PATH.STORE}>Tienda</Link>
            <Link to={PATH.EVENTS}>Eventos</Link>
            {isAuthenticated && <Link to={PATH.INVENTORY}>Inventario</Link>}
          </nav>

          <div className="header__icons">
            <Link to={PATH.CARRITO} className="header__carrito">
              🛒
              {!!carrito.length && (
                <span className="header__carrito-count">{carrito.length}</span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="header__dropdown" ref={dropdownRef}>
                <button
                  className="header__dropdown-toggle header__avatar-btn"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  aria-expanded={isDropdownOpen}
                >
                  {user}
                  <img
                    src={`https://avatars.dicebear.com/api/initials/${user?.username}.svg`}
                    alt="Avatar"
                    className="header__avatar-img"
                  />
                </button>

                <ul
                  className={`header__dropdown-menu ${isDropdownOpen ? "visible" : ""}`}
                  role="menu"
                >
                  <li>
                    <Link to={PATH.PROFILE}>👤 Perfil</Link>
                  </li>
                  <li>
                    <Link to={PATH.DASHBOARD}>🛍️ Dashboard</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout}>🚪 Salir</button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to={PATH.LOGIN} title="Iniciar sesión">
                👤
              </Link>
            )}
          </div>
        </div>

        {isNavOpen && <div className="header__overlay" />}
        <nav
          ref={navRef}
          className={`header__nav-mobile ${isNavOpen ? "slide-down" : ""}`}
          onClick={() => setIsNavOpen(false)}
        >
          <Link to={PATH.HOME}>Inicio</Link>
          <Link to={PATH.STORE}>Tienda</Link>
          <Link to={PATH.EVENTS}>Eventos</Link>
          {isAuthenticated && <Link to={PATH.INVENTORY}>Inventario</Link>}
        </nav>
      </div>
    </header>
  );
};

export default Header;
