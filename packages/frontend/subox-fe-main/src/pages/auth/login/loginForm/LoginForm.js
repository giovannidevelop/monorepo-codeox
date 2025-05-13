import React, { useState } from 'react';
import "./loginForm.scss";
import { TbEyeClosed } from "react-icons/tb";
import { ImEye } from "react-icons/im";
import { useNavigate } from 'react-router-dom';
import { AUTH_ACTIONS } from "../../../../app/redux/actions/authActions";
import { useDispatch } from "react-redux";
import Input from '../../../../component/common/input/Input';
import SubmitButton from '../../../../component/common/button/SubmitButton';

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [formErrors, setFormErrors] = useState({});

    const VALIDATION_RULES = {
        username: {
            required: "Por favor, ingresa un nombre de usuario.",
            pattern: /^[a-zA-Z0-9._-]+$/,
            patternMessage: "El nombre de usuario solo puede contener letras, números, guiones bajos, guiones y puntos.",
            minLength: 3,
            minLengthMessage: "El nombre de usuario debe tener al menos 3 caracteres.",
            maxLength: 20,
            maxLengthMessage: "El nombre de usuario no puede tener más de 20 caracteres.",
        },
        password: {
            required: "Por favor, ingresa una contraseña.",
            minLength: 6,
            minLengthMessage: "La contraseña debe tener al menos 6 caracteres.",
        },
    };

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
        const errors = Object.keys(formData).reduce((acc, fieldName) => {
            const errorMessage = validateField(fieldName, formData[fieldName]);
            if (errorMessage) acc[fieldName] = errorMessage;
            return acc;
        }, {});
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setFormErrors((prev) => ({
            ...prev,
            [name]: validateField(name, value),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            dispatch(AUTH_ACTIONS.login(formData, navigate));
        }
    };

    return (
        <form noValidate className="loginForm" onSubmit={handleSubmit}>
            <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                label="Nombre de Usuario"
                error={formErrors.username}
            />
            <Input
                id="password"
                name="password"
                type={passwordVisible ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                label="Contraseña"
                error={formErrors.password}
                icon={passwordVisible ? <ImEye /> : <TbEyeClosed />}
                onIconClick={togglePasswordVisibility}
            />
            <SubmitButton text="Entrar" />
        </form>
    );
};

export default LoginForm;
