import { Outlet } from "react-router-dom";
import NavBar from "../component/navBar/NavBar";
import Header from "../component/header/Header";
const NavBarWrapper = () => {

  return (
    <>
        <Header/>
        <div className="outlet">
          <Outlet />
        </div>
    </>
  )

};

export default NavBarWrapper;