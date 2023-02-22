import React from "react";

export default function SearchBox(props) {
  const { name, value, onChange } = props;

  function onTextChange(e) {
    onChange(e.target.value);
  }

  return (
    <input
      className="form-control"
      id={name}
      name={name}
      value={value}
      placeholder="Search..."
      onChange={onTextChange}
    />
  );
}
