import React, { useState } from 'react';
import "./loginForm.scss";
import { TbEyeClosed } from "react-icons/tb";
import { ImEye } from "react-icons/im";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { AUTH_ACTIONS } from "../../../../app/redux/actions/authActions";
import Input from '../../../../component/common/input/Input';
import SubmitButton from '../../../../component/common/button/SubmitButton';

const VALIDATION_RULES = {
    login_user_temp: {
        required: "Por favor, ingresa un nombre de usuario.",
        pattern: /^[a-zA-Z0-9._-]+$/,
        patternMessage: "El nombre de usuario solo puede contener letras, números, guiones bajos, guiones y puntos.",
        minLength: 3,
        minLengthMessage: "Debe tener al menos 3 caracteres.",
        maxLength: 20,
        maxLengthMessage: "No puede tener más de 20 caracteres.",
    },
    login_pass_temp: {
        required: "Por favor, ingresa una contraseña.",
        minLength: 0,
        minLengthMessage: "",
    },
};

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ login_user_temp: "", login_pass_temp: "" });

    const [formErrors, setFormErrors] = useState({});
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => setPasswordVisible(prev => !prev);

    const validateField = (fieldName, value) => {
        const rules = VALIDATION_RULES[fieldName];
        if (!rules) return "";

        if (!value.trim()) return rules.required;
        if (rules.pattern && !rules.pattern.test(value)) return rules.patternMessage;
        if (rules.minLength && value.length < rules.minLength) return rules.minLengthMessage;
        if (rules.maxLength && value.length > rules.maxLength) return rules.maxLengthMessage;

        return "";
    };

    const validateForm = () => {
        const errors = {};
        for (const field in formData) {
            const error = validateField(field, formData[field]);
            if (error) errors[field] = error;
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = ({ target: { name, value } }) => {
        setFormData(prev => ({ ...prev, [name]: value }));
        setFormErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            dispatch(AUTH_ACTIONS.login(formData, navigate));
        }
    };

    return (
        <form noValidate className="login-form" onSubmit={handleSubmit} autoComplete="off">
            <Input
                id="login_user_temp"
                name="login_user_temp" // nombre poco común
                label="Nombre de Usuario"
                value={formData.login_user_temp}
                onChange={handleChange}
                error={formErrors.login_user_temp}
                autoComplete="new-username" // evita autocompletar
            />
            <Input
                id="login_pass_temp"
                name="login_pass_temp" // nombre poco común
                type={passwordVisible ? "text" : "password"}
                label="Contraseña"
                value={formData.login_pass_temp}
                onChange={handleChange}
                error={formErrors.login_pass_temp}
                icon={passwordVisible ? <ImEye /> : <TbEyeClosed />}
                onIconClick={togglePasswordVisibility}
                autoComplete="new-password"
            />
            <SubmitButton text="Entrar" />
        </form>

    );
};

export default LoginForm;
