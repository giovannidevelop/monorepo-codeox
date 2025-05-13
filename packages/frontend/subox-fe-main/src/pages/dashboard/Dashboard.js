import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.scss";
import PATH from "../../router/path";

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);
  const [jumbotronImage, setJumbotronImage] = useState("");

  const fetchJumbotronImage = async () => {
    try {
      const response = await fetch("https://source.unsplash.com/800x400/?dashboard,exclusive");
      return response.url;
    } catch (error) {
      console.error("Error al obtener la imagen del Jumbotron:", error);
      return "https://via.placeholder.com/800x400";
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const jumbotron = await fetchJumbotronImage();
      setJumbotronImage(jumbotron);

      // Datos estáticos para categorías y eventos
      setCategories([
        { title: "Gestión de Inventario", link: PATH.INVENTORY, imgSrc: "https://via.placeholder.com/150" },
        { title: "Perfil de Usuario", link: PATH.PROFILE, imgSrc: "https://via.placeholder.com/150" },
        { title: "Eventos", link: PATH.EVENTS, imgSrc: "https://via.placeholder.com/150" },
      ]);

      setEvents([
        {
          title: "Evento 1",
          description: "Detalles de un evento especial.",
          imgSrc: "https://via.placeholder.com/200x150",
        },
        {
          title: "Evento 2",
          description: "Participa en nuestras actividades exclusivas.",
          imgSrc: "https://via.placeholder.com/200x150",
        },
      ]);
    };

    loadData();
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard__jumbotron">
        <div className="dashboard__jumbotron-container">
          <div className="dashboard__jumbotron-content">
            <h1 className="dashboard__jumbotron-title">¡Bienvenido, { "Usuario"}!</h1>
            <p className="dashboard__jumbotron-subtitle">
              Explora las funcionalidades y recursos exclusivos para ti.
            </p>
            <button className="dashboard__jumbotron-button">
              <Link to={PATH.PROFILE} style={{ color: "white", textDecoration: "none" }}>
                Ver Mi Perfil
              </Link>
            </button>
          </div>
          <div className="dashboard__jumbotron-image">
            <img src={jumbotronImage} alt="Jumbotron" className="dashboard__jumbotron-img" />
          </div>
        </div>
      </div>

      <div className="dashboard__categories">
        <h2 className="dashboard__categories-title">Accesos Rápidos</h2>
        <div className="dashboard__categories-container">
          {categories.map((category, index) => (
            <Link key={index} to={category.link} className="dashboard__category">
              <div className="dashboard__categories-image">
                <img src={category.imgSrc} alt={category.title} className="dashboard__category-image-img" />
              </div>
              <span className="dashboard__category-title">{category.title}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="dashboard__events">
        <h2 className="dashboard__events-title">Eventos Exclusivos</h2>
        <div className="dashboard__events-container">
          {events.map((event, index) => (
            <div key={index} className="dashboard__events-container-card">
              <img src={event.imgSrc} alt={event.title} className="dashboard__event-img" />
              <h3 className="dashboard__event-title">{event.title}</h3>
              <p className="dashboard__event-description">{event.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
