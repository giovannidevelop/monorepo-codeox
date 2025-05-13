import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './searchMenu.scss';

const SearchMenu = () => {
    const [isOpenSearchMenu, setIsOpenSearchMenu] = useState(false);

    const handleMouseEnterSearchMenu = () => {
        setIsOpenSearchMenu(true);
    };

    const handleMouseLeaveSearchMenu = () => {
        setIsOpenSearchMenu(false);
    };


    return (
        <div className="searchMenu" onMouseEnter={handleMouseEnterSearchMenu}
            onMouseLeave={handleMouseLeaveSearchMenu}>

            <input
                type="text"
                placeholder="Buscar"
                className="searchMenu__input"
            />

            <span className="searchMenu__button">
                <FaSearch className="searchMenu__button__iconSearchMenu" />
            </span>

            {isOpenSearchMenu && (
                <div className="searchMenu__container">
                    lista de productos encontrados
                </div>
            )}
        </div>

    );
};

export default SearchMenu;