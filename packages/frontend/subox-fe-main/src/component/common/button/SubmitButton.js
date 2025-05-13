import React from 'react';
import './submitButton.scss'


const SubmitButton = ({ text, className }) => {
    return (
        <button type="submit"  className={`submitButton ${className}`}>{text}</button>
    );
}

export default SubmitButton;
