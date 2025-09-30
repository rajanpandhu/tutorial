import React from 'react';


const Header = ({ 
  title, 
  subtitle, 
  navItems,
  logo,
  backgroundColor = '#2c3e50',
  textColor = 'white',
  style = {},

}) => {
  const headerStyle = {
    backgroundColor: backgroundColor,
    color: textColor,
    padding: '20px',
    textAlign: 'center',
    ...style
  };


  return (
    <header style={headerStyle}>
      {/* Logo */}
      {logo && (
        <div style={{ marginBottom: '10px' }}>
          <img src={logo} alt="Logo" style={{ height: '50px' }} />
        </div>
      )}

      {/* Title */}
      <h1 style={{ margin: '10px 0', fontSize: '32px' }}>
        {title}
      </h1>

      {/* Subtitle */}
      {subtitle && (
        <p style={{ margin: '10px 0', fontSize: '16px', opacity: 0.9 }}>
          {subtitle}
        </p>
      )}

    </header>
  );
};

export default Header;