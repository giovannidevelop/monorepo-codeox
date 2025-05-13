import React from 'react';
import './input.scss'



const Input = ({ id, name, type = 'text', value, onChange, label, error, icon, onIconClick }) => {
    return (
        <div className="input">
            <input
                className="input-body"
                type={type}
                required
                id={id}
                name={name}
                value={value}
                onChange={onChange}
            />
            <label htmlFor={id} className="input-label">{label}</label>
            {error && <div id={`error-${id}`} className="error-message">{error}</div>}
            {icon && <span onClick={onIconClick} className='icon-eye'>{icon}</span>}
        </div>
    )
}

export default Input;