import React from "react";

export default function Input(props) {
  const { name, label, value, type, error, onChange } = props;

  return (
    <div className="mb-3">
      <label className="form-label">
        <strong>{label}</strong>
      </label>
      <input
        className="form-control"
        type={type ? type : "text"}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}
