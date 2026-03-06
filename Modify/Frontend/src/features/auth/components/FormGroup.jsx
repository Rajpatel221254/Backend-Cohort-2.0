import React, { useState } from "react";

const FormGroup = ({ label, placeholder, value, onChange, type = "text" }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`form-group ${isFocused ? "focused" : ""}`}>
      <label htmlFor={label}>{label}</label>
      <input
        value={value}
        onChange={onChange}
        type={type}
        id={label}
        name={label}
        placeholder={placeholder}
        required
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <div className="form-group__underline"></div>
    </div>
  );
};

export default FormGroup;
