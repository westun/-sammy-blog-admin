import React, { ReactNode } from "react";

interface Props {
  title: string;
  description: string;
  imageUrl: string;
  styles?: any;
  children?: ReactNode;
}

export default function Card(props: Props) {
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
