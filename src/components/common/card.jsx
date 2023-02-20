import React from "react";

export default function Card(props) {
  const { imageUrl, title, description, styles } = props;

  return (
    <div className="card" style={styles}>
      <img src={imageUrl} className="card-img-top" alt="" />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        {props.children}
      </div>
    </div>
  );
}
