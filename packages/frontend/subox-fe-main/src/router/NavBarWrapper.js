import { Outlet } from "react-router-dom";
import Header from "../component/dashboard/header/Header";
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