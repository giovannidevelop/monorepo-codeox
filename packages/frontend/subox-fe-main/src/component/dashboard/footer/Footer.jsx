// src/component/footer/Footer.jsx
import React from "react";
import "./footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="footer__brand">
          <h3>Fashion Fardos</h3>
          <p>Ropa americana seleccionada para ti.</p>
        </div>

        <div className="footer__links">
          <h4>Enlaces</h4>
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/carrito">Carrito</a></li>
            <li><a href="/#productos">Tienda</a></li>
          </ul>
        </div>

        <div className="footer__contacto">
          <h4>Contacto</h4>
          <p><a href="mailto:fashionfardos@gmail.com">fashionfardos@gmail.com</a></p>
          <p><a href="https://wa.me/56912345678" target="_blank" rel="noreferrer">WhatsApp</a></p>
          <p><a href="https://instagram.com/fashionfardos.cl" target="_blank" rel="noreferrer">Instagram</a></p>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} Fashion Fardos. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
