import React from "react";

const events = [
    {
        id: 1,
        name: "Fiesta de Verano Exclusiva",
        date: "2025-02-10",
        location: "Club Paradise, Santiago",
        description: "Únete a nosotros para una noche inolvidable con música en vivo, comida y diversión.",
        image: "https://via.placeholder.com/300x200?text=Fiesta+de+Verano",
    },
    {
        id: 2,
        name: "Desfile de Moda Exclusivo",
        date: "2025-03-05",
        location: "Centro de Convenciones, Valparaíso",
        description: "Explora las últimas tendencias en moda con nuestras marcas exclusivas.",
        image: "https://via.placeholder.com/300x200?text=Desfile+de+Moda",
    },
    {
        id: 3,
        name: "Noche de Karaoke VIP",
        date: "2025-04-15",
        location: "Bar Elite, Concepción",
        description: "Ven a mostrar tu talento o simplemente disfruta del espectáculo.",
        image: "https://via.placeholder.com/300x200?text=Karaoke+VIP",
    },
];

const Events = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>¡Próximos Eventos Exclusivos!</h1>
            <div style={styles.eventsList}>
                {events.map((event) => (
                    <div key={event.id} style={styles.eventCard}>
                        <img
                            src={event.image}
                            alt={event.name}
                            style={styles.eventImage}
                        />
                        <h2 style={styles.eventName}>{event.name}</h2>
                        <p style={styles.eventDetails}>
                            <strong>Fecha:</strong> {event.date}
                        </p>
                        <p style={styles.eventDetails}>
                            <strong>Ubicación:</strong> {event.location}
                        </p>
                        <p style={styles.eventDescription}>{event.description}</p>
                        <button style={styles.button}>Reservar Lugar</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        backgroundColor: "#f4f4f9",
    },
    title: {
        textAlign: "center",
        fontSize: "2.5rem",
        marginBottom: "20px",
        color: "#2c3e50",
    },
    eventsList: {
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent: "center",
    },
    eventCard: {
        width: "300px",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        padding: "15px",
        textAlign: "center",
    },
    eventImage: {
        width: "100%",
        height: "200px",
        objectFit: "cover",
        borderRadius: "10px 10px 0 0",
    },
    eventName: {
        fontSize: "1.5rem",
        color: "#3498db",
        marginTop: "10px",
    },
    eventDetails: {
        margin: "10px 0",
        color: "#555",
    },
    eventDescription: {
        fontSize: "1rem",
        color: "#777",
        marginBottom: "15px",
    },
    button: {
        backgroundColor: "#3498db",
        color: "#fff",
        padding: "10px 15px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
};

export default Events;
