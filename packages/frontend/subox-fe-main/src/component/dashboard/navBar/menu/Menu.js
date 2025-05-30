import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CiUser } from 'react-icons/ci';
import { FaAngleDown } from 'react-icons/fa';
import './Menu.scss';
import { PATH } from "../../../router/path"

const Menu = () => {

  const [isOpenLogin, setIsOpenLogin] = useState(false);

  const handleMouseEnterLogin = () => {
    setIsOpenLogin(true);
  };

  const handleMouseLeaveLogin = () => {
    setIsOpenLogin(false);
  };
 

  return (
    <div className="Menu"
      onMouseEnter={handleMouseEnterLogin}
      onMouseLeave={handleMouseLeaveLogin}>
      <span className="Menu__button">
        <CiUser className="Menu__button__iconUser" />
        <Link to={PATH.HOME.PRIVATE}>Inicio</Link>
        <FaAngleDown className="Menu__button__iconDown" />
      </span>
      {isOpenLogin && (
        <ul className="Menu__list">
          <>
            <li className="Menu__list__link">
              <Link to={PATH.EVENTS}>Eventos</Link>
            </li>
            <li className="Menu__list__link">
              <Link to={PATH.STORE}>Tienda</Link>
            </li>
          </>
        </ul>
      )}
    </div>
  );
};

export default Menu;