import RegisterForm from "./registerForm/registerForm";
import AuthButton from "../../../component/common/button/AuthButton";
import { Link } from "react-router-dom";
import { PATH } from '../../../router/path';
import "./register.scss"

const Register = () => {


    return (
        <div className="register">
            <div className="register-header">
                <h1 className="register-tittle">Registra una nueva cuenta</ h1>
            </div>
            <p className="register-instructions">
                Completa el formulario para comenzar

            </p>
            <div className="register-content">
                <RegisterForm />
                {
                    /* 
                     <div className="register-instruction">
                         <div className="login-divider">
                             <hr className="divider-line" />
                             <span className="divider-text">o accede con redes sociales</span>
                             <hr className="divider-line" />
                         </div>
                     </div>
                     <AuthButton text={'Registrar'} />*/
                }

            </div>
            <div className="register-fotter">
                <p>
                    ¿Ya tines una cuenta? puedes Inicia sesión  {" "}
                    <Link className="register-signin-link" to={PATH.LOGIN}>
                        Aquí
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;