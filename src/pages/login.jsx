import React, { useState, useEffect } from "react";
import Joi from "joi";

export default function Login() {
  const [fields, setFields] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});

  const schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  const schemaObj = Joi.object(schema);

  function handleFieldChange(e) {
    const newFields = { ...fields };
    newFields[e.target.name] = e.target.value;
    setFields(newFields);
  }

  function handleSubmit(e) {
    e.preventDefault();

    setErrors({});

    const { error } = schemaObj.validate(fields, { abortEarly: false });
    if (!error) {
      return doSubmit();
    }

    const errorsObj = {};
    for (let item of error.details) {
      errorsObj[item.path[0]] = item.message;
    }
    setErrors(errorsObj);
  }

  function doSubmit() {
    console.log("submitted");
  }

  return (
    <React.Fragment>
      <h1>Login</h1>
      <div className="row">
        <div className="col-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={fields.username}
                onChange={handleFieldChange}
              />
              {errors["username"] && (
                <div className="alert alert-danger">{errors["username"]}</div>
              )}
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={fields.password}
                onChange={handleFieldChange}
              />
              {errors["password"] && (
                <div className="alert alert-danger">{errors["password"]}</div>
              )}
            </div>
            <div>
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}
