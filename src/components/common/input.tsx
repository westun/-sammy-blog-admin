import React, { ChangeEvent } from "react";

interface Props {
  name: string;
  label: string;
  value: string;
  type?: string;
  error?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Input(props: Props) {
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
