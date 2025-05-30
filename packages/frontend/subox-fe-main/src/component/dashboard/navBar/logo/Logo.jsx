import "./logo.scss"
import {PATH} from "../../../router/path"
import { Link } from "react-router-dom";


const Logo = () => {

    return (
        <Link to={PATH.HOME} className="logo">
            <div className="logo__wrapper">
                <span className="logo__wrapper__top">
                    <span className="logo__wrapper__top__letter">FASHION</span></span>
                <span className="logo__wrapper__mid">
                    <span className="logo__wrapper__mid__letter">City</span>
                </span>
                <span className="logo__wrapper__bot">
                    <span className="logo__wrapper__bot__letter">Tendencias </span>
                </span>
            </div>
          <span className="logo__triangule">
            </span> 
        </Link>
    );
}



export default Logo;

