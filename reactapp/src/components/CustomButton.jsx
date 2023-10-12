import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CustomButton = ({ text, icon, onClick }) => {
    return (
        <button onClick={onClick}>
            <FontAwesomeIcon icon={icon} />
            <label>{text}</label>
        </button>
    );
};

CustomButton.propTypes = {
    text: PropTypes.string.isRequired,
    icon: PropTypes.object.isRequired,
    onClick: PropTypes.func, // Declara el nuevo prop para el evento onClick
};

export default CustomButton;
