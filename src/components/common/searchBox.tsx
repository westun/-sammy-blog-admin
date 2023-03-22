import React, { ChangeEvent } from "react";

interface Props {
  name?: string;
  value?: string;
  onChange: (criteria: string) => void;
}

export default function SearchBox(props: Props) {
  const { name, value, onChange } = props;

  function onTextChange(e: ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value);
  }

  return (
    <input
      className="form-control"
      id={name}
      name={name}
      value={value}
      placeholder="Search..."
      onChange={(e) => onTextChange}
    />
  );
}
