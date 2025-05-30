import { FaRegUser } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import styles from './Navbar.module.scss';
import { useState, useEffect } from "react";
import Logo from "./logo/Logo";
import AccountMenu from "./accountMenu/AccountMenu";
import CartMenu from "./cartMenu/CartMenu";
import SearchMenu from "./searchMenu/SearchMenu";
import { PATH } from "../../router/path";
import Sidebar from "./sidebar/Sidebar";
import Menu from "./menu/Menu";

const NavBar = () => {
    const [showSidebarL, setShowSidebarL] = useState(false);
    const [showSidebarR, setShowSidebarR] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setShowSidebarR(false);
                setShowSidebarL(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleSidebar = (side) => {
        setShowSidebarL(side === "left" ? !showSidebarL : false);
        setShowSidebarR(side === "right" ? !showSidebarR : false);
    };

    const handleLogoutNavBar = () => {
        console.log("Logout navbar");
    };

    return (
        <div className={styles.navba_container}>
            {(showSidebarR || showSidebarL) && (
                <div className={styles.navba_container_closeWrapper} onClick={() => toggleSidebar("")}></div>
            )}

            {/* Botón de menú izquierdo */}
            <GiHamburgerMenu className={styles.navba_container_giHamburgerMenu} onClick={() => toggleSidebar("left")} />

            <div className={styles.navba_container_menu__container}>
                {/* Sidebar Izquierdo */}
                <Sidebar
                    type="left"
                    isOpen={showSidebarL}
                    toggleSidebar={() => toggleSidebar("left")}
                    links={[
                        { to: PATH.STORE, label: "Tienda" },
                        { to: PATH.EVENTS, label: "Eventos" },
                    ]}
                />
                {/* Sidebar Derecho */}
                <Sidebar
                    type="right"
                    isOpen={showSidebarR}
                    toggleSidebar={() => toggleSidebar("right")}
                    links={ [
                                { to: PATH.PROFILE, label: "Perfil", onClick: toggleSidebar },
                                { label: "Salir", onClick: handleLogoutNavBar },
                                { to: PATH.LOGIN, label: "Iniciar sesión", onClick: toggleSidebar },
                                { to: PATH.SIGNUP, label: "Registro", onClick: toggleSidebar },
                            ]
                    }
                    extraLinks={[
                        { to: PATH.STORE, label: "Tienda" },
                        { to: PATH.EVENTS, label: "Eventos" },
                        { to: "#", label: "Aplicación móvil de FC Tendencias" },
                    ]}
                />
            </div>
            {/* Logo */}
            <div className={styles.navba_container_logo__container}>
                    <Logo />
            </div>
            {/* Menú Panel */}
            <div className={styles.navba_container_panel__container}>
            <Menu />
                <SearchMenu />
                <CartMenu />
                <AccountMenu />
            </div>

            {/* Icono de Usuario */}
            <FaRegUser className={styles.navba_container_faRegUser} onClick={() => toggleSidebar("right")} />
        </div>
    );
};

export default NavBar;
