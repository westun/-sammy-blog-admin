import React from "react";

export default function Select(props) {
  const { name, label, value, type, error, onChange, options = [] } = props;

  return (
    <div className="mb-3">
      <label className="form-label">
        <strong>{label}</strong>
      </label>
      <select
        className="form-control"
        type={type ? type : "text"}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      >
        <option></option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}
