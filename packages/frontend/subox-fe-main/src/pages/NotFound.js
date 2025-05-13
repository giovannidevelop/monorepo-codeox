import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>¡Oops! Página no encontrada</h1>
            <p style={styles.description}>
                Parece que te has perdido. Mientras tanto, ¿por qué no revisas nuestras ofertas de suscripción mensual?
            </p>
            <div style={styles.box}>
                <h2 style={styles.offerTitle}>🌟 ¡Oferta Especial! 🌟</h2>
                <p style={styles.offerDescription}>
                    Suscríbete ahora y recibe <strong>3 poleras al mes</strong> por solo <strong>$15,000 CLP</strong>.
                </p>
                <Link to="/store" style={styles.button}>
                    Ver Suscripciones
                </Link>
            </div>
            <Link to="/" style={styles.homeLink}>
                Volver al inicio
            </Link>
        </div>
    );
};

const styles = {
    container: {
        textAlign: "center",
        padding: "50px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f8f9fa",
        color: "#343a40",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: "3rem",
        fontWeight: "bold",
        marginBottom: "20px",
    },
    description: {
        fontSize: "1.2rem",
        marginBottom: "30px",
    },
    box: {
        backgroundColor: "#ffffff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        maxWidth: "400px",
        textAlign: "center",
        marginBottom: "20px",
    },
    offerTitle: {
        fontSize: "1.5rem",
        fontWeight: "bold",
        color: "#007bff",
        marginBottom: "10px",
    },
    offerDescription: {
        fontSize: "1rem",
        marginBottom: "20px",
    },
    button: {
        display: "inline-block",
        backgroundColor: "#28a745",
        color: "#ffffff",
        padding: "10px 20px",
        textDecoration: "none",
        borderRadius: "5px",
        fontSize: "1rem",
        fontWeight: "bold",
    },
    homeLink: {
        marginTop: "20px",
        fontSize: "1rem",
        color: "#007bff",
        textDecoration: "none",
    },
};

export default NotFound;
