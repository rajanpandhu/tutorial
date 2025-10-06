import React from 'react';

const InputField = ({ label, type, name, value, onChange, error }) => {
  return (
    <div className="form-group">
      <label className="form-label">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        style={{ padding: '8px', width: '100%' }}
        className={`form-input ${error ? 'error' : ''}`}
        placeholder={`Enter ${label.toLowerCase()}`}
      />
       {error && (
        <p className="error-message">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
};

export default InputField;
