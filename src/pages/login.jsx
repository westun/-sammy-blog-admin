import React, { useState, useEffect } from "react";
import Joi from "joi";
import Input from "./../components/common/input";

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
    console.log("submitted", fields);
  }

  return (
    <React.Fragment>
      <h1>Login</h1>
      <div className="row">
        <div className="col-6">
          <form onSubmit={handleSubmit}>
            <Input
              name="username"
              label="Username"
              value={fields.username}
              error={errors["username"]}
              onChange={handleFieldChange}
            />
            <Input
              type="password"
              name="password"
              label="Password"
              value={fields.password}
              error={errors["password"]}
              onChange={handleFieldChange}
            />
            <div>
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}
