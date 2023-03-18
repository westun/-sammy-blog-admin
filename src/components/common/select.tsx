import React, { ChangeEvent } from "react";

export interface SelectOptions {
  text: string;
  value: string;
}

interface Props {
  name: string;
  label: string;
  value: string;
  type: string;
  error: string;
  options: SelectOptions[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export default function Select(props: Props) {
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
