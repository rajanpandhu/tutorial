import React from "react";

const Button  = ({ 
  childern,
  onClick,
  type = 'button',
  disabled = false,
  variant = 'primary',
  className = '',
  style = {}
}) => {

    const baseStyles = {
        padding : '10px 20px',
        border : 'none',
        borderRadius : '5px',
        cursor : disabled ? 'not-allowed' : 'pointer',
        fontSize : '16px',
        fontWeight : '500',
        opacity : disabled ? 0.6 : 1,
        transition : 'all 0.3s ease'
    };
    const variantStyle = {
        primary : {
            backgroundColor : '#007bff',
            color : 'white'
        },
        secondary : {
            backgroundColor : '#6c757d',
            color : 'white'
        },
        danger : {
            backgroundColor : '#dc3545',
            color : 'white'
        }
    };
    const combineStyle = {
        ...baseStyles,
       ...variantStyle[variant],
        ...style,
    }

   return (
    <button 
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={combineStyle}
    >
      {childern}
    </button>
  );
}

export default Button;