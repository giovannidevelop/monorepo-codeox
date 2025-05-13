import RegisterForm from "./registerForm/registerForm";
import AuthButton from "../../../component/common/button/AuthButton";
import { Link } from "react-router-dom";
import { PATH } from '../../../router/path';
import "./register.scss"

const Register = () => {


    return (
        <div className="register">
            <div className="register-title">
                <span>Registra una nueva cuenta</span>
            </div>
            <span className="register-instructions">
                Completa el formulario para comenzar
            </span>
            <div className="register-main">
                <RegisterForm />
                <div className="login-instruction">
                <div>
                    <hr />
                </div>
                <span>
                    o te puedes inscribir con redes sociales
                </span>
                <div>
                    <hr />
                </div>
            </div>
            <AuthButton text={'Registrar'} />
            </div>
            <div className="register-fotter">
                <p>
                    ¿Ya tines una cuenta? puedes acceder
                    <Link style={{ marginLeft: "0.3rem" }} to={PATH.LOGIN}>
                        Aqui
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;