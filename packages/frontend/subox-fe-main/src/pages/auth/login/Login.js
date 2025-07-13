import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "./loginForm/LoginForm";
import AuthButton from "../../../component/common/button/AuthButton";
import { PATH } from "../../../router/path";
import "./login.scss";

const Login = () => {

    return (
        <div className="login-container">
            <div className="login-header">
                <h1 className="login-title">Accede a tu cuenta</h1>
                <p className="login-instructions">
                    Ingresa tus datos para acceder a tu cuenta
                </p>
            </div>
            <div className="login-content">
                <LoginForm />
                {
                    /* 
                <div className="login-divider">
                    <hr className="divider-line" />
                    <span className="divider-text">o accede con redes sociales</span>
                    <hr className="divider-line" />
                </div>
                <AuthButton text="Acceder" />
           */
                }
            </div>
            <div className="login-footer">
                <p>
                    ¿Aún no tienes cuenta?{" "}
                    <Link className="login-signup-link" to={PATH.SIGNUP}>
                        Regístrate aquí
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
