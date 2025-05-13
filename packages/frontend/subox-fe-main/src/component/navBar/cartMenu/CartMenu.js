import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CiShoppingCart } from 'react-icons/ci';
import { FaAngleDown } from 'react-icons/fa';
import './CartMenu.scss';
import { PATH } from "../../../router/path"

const CartMenu = () => {

    const [isOpenCart, setIsOpenCart] = useState(false);

    const handleMouseEnterCart = () => {
        setIsOpenCart(true);
    };

    const handleMouseLeaveCart = () => {
        setIsOpenCart(false);
    };


    return (
        <div className="cart" onMouseEnter={handleMouseEnterCart} onMouseLeave={handleMouseLeaveCart}>
            <span className="cart__counter">1</span>
            <span className="cart__button">
                <CiShoppingCart className="cart__button__IconCart" />
                <FaAngleDown className="cart__button__iconDown" />
            </span>
            {isOpenCart && (
                <ul className="cart__list">
                    {
                        (
                            <>
                                <div className="cart__container">
                                    <div>Aun no hay productos</div>
                                </div>
                                <li className="cart__list__link">
                                    <Link to={PATH.PROFILE}>Historial de compras</Link>
                                </li>
                            </>
                        )}
                </ul>
            )}
        </div>
    );
};

export default CartMenu;