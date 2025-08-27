import React, { useState } from 'react';
import "./registerForm.scss";
import { TbEyeClosed } from "react-icons/tb";
import { ImEye } from "react-icons/im";
import Input from '../../../../component/common/input/Input';
import SubmitButton from '../../../../component/common/button/SubmitButton';
import { endpoints } from "../../../../config/api";

const VALIDATION_RULES = {
  username: {
    required: "Por favor, ingresa un nombre de usuario.",
    pattern: /^[a-zA-Z0-9._-]+$/,
    patternMessage: "El nombre de usuario solo puede contener letras, números, guiones bajos, guiones y puntos.",
    minLength: 3,
    minLengthMessage: "Debe tener al menos 3 caracteres.",
    maxLength: 20,
    maxLengthMessage: "No puede tener más de 20 caracteres.",
  },
  email: {
    required: "Por favor, ingresa un email electrónico.",
    pattern: /\S+@\S+\.\S+/,
    patternMessage: "Por favor, ingresa un email válido.",
  },
  password: {
    required: "Por favor, ingresa una contraseña.",
    minLength: 8,
    minLengthMessage: "Debe tener al menos 8 caracteres.",
  },
  confirmPassword: {
    required: "Por favor, confirma tu contraseña.",
  },
};

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    register_user_temp: "",
    register_email_temp: "",
    register_pass_temp: "",
    register_confirm_temp: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => setPasswordVisible(prev => !prev);
  const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(prev => !prev);

  const validateField = (fieldName, value) => {
    const fieldMap = {
      register_user_temp: 'username',
      register_email_temp: 'email',
      register_pass_temp: 'password',
      register_confirm_temp: 'confirmPassword',
    };

    const rules = VALIDATION_RULES[fieldMap[fieldName]];
    if (!rules) return "";

    if (!value.trim()) return rules.required;
    if (rules.pattern && !rules.pattern.test(value)) return rules.patternMessage;
    if (rules.minLength && value.length < rules.minLength) return rules.minLengthMessage;
    if (rules.maxLength && value.length > rules.maxLength) return rules.maxLengthMessage;

    if (fieldName === 'register_confirm_temp' && value !== formData.register_pass_temp) {
      return "Las contraseñas no coinciden.";
    }

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const registerData = {
      username: formData.register_user_temp,
      email: formData.register_email_temp,
      password: formData.register_pass_temp,
    };

    try {
      const res = await fetch(endpoints.auth.register(), {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData)
      });

      if (!res.ok) {
        let msg = "Error en el registro";
        try {
          const ct = res.headers.get("content-type") || "";
          msg = ct.includes("application/json") ? (await res.json()).message || msg : await res.text() || msg;
        } catch {}
        alert(msg);
        return;
      }

      alert("Registro exitoso");
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("No se pudo registrar. Intenta nuevamente.");
    }
  };

  return (
    <form noValidate className="register-form" onSubmit={handleSubmit} autoComplete="off">
      <Input
        id="register_user_temp"
        name="register_user_temp"
        label="Ingresar usuario"
        value={formData.register_user_temp}
        onChange={handleChange}
        error={formErrors.register_user_temp}
        autoComplete="new-username"
      />
      <Input
        id="register_email_temp"
        name="register_email_temp"
        label="Ingresar email"
        value={formData.register_email_temp}
        onChange={handleChange}
        error={formErrors.register_email_temp}
        autoComplete="new-email"
      />
      <Input
        id="register_pass_temp"
        name="register_pass_temp"
        type={passwordVisible ? 'text' : 'password'}
        label="Ingresar contraseña"
        value={formData.register_pass_temp}
        onChange={handleChange}
        error={formErrors.register_pass_temp}
        icon={passwordVisible ? <ImEye /> : <TbEyeClosed />}
        onIconClick={togglePasswordVisibility}
        autoComplete="new-password"
      />
      <Input
        id="register_confirm_temp"
        name="register_confirm_temp"
        type={confirmPasswordVisible ? 'text' : 'password'}
        label="Confirmar contraseña"
        value={formData.register_confirm_temp}
        onChange={handleChange}
        error={formErrors.register_confirm_temp}
        icon={confirmPasswordVisible ? <ImEye /> : <TbEyeClosed />}
        onIconClick={toggleConfirmPasswordVisibility}
        autoComplete="new-password"
      />
      <SubmitButton text="Registrar" />
    </form>
  );
};

export default RegisterForm;
