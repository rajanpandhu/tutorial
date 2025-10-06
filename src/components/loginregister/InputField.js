import React from 'react';

const InputField = ({ label, type, name, value, onChange, error }) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label htmlFor={name}>{label}</label><br />
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        style={{ padding: '8px', width: '100%' }}
      />
      {error && <small style={{ color: 'red' }}>{error}</small>}
    </div>
  );
};

export default InputField;
