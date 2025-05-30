import React from 'react';
import { MdClose } from "react-icons/md";
import classNames from "classnames"; // Instala con: npm install classnames
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.scss"; // Usa CSS Modules si es necesario

const Sidebar = ({ type, isOpen, toggleSidebar, links = [], extraLinks = [] }) => {
    const sidebarClass = classNames(styles.sidenav, {
        [styles.sidenavOpen]: isOpen,
        [styles.sidenavLeft]: type === "left",
        [styles.sidenavRight]: type === "right",
    });

    return (
        <div className={sidebarClass}>
            <div className={styles.containerUno}>
                <MdClose className={styles.closebtn} onClick={toggleSidebar} />
            </div>
            <div className={styles.containerDos}>
                {links.length > 0 && (
                    <ul className={styles.menuUno}>
                        {links.map((link, i) => (
                            <li key={i} className={styles.menuLink}>
                                {link.to ? (
                                    <Link to={link.to}>{link.label}</Link>
                                ) : (
                                    <span onClick={link.onClick}>{link.label}</span>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
                {extraLinks.length > 0 && (
                    <ul className={styles.menuDos}>
                        {extraLinks.map((link, i) => (
                            <li key={i} className={styles.menuLink}>
                                <Link to={link.to}>{link.label}</Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
