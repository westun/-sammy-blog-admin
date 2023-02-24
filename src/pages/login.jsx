import React, { useState, useEffect } from "react";
import Joi from "joi";
import Input from "./../components/common/input";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/common/spinner";
import { login } from "../services/authService";
import { toast } from "react-toastify";
import CatLogo from "../assets/images/cat_logo.png";

export default function Login() {
  const [fields, setFields] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [hasLoginError, setHasLoginError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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

  async function doSubmit() {
    setHasLoginError(false);
    try {
      setIsLoading(true);

      await login({
        email: fields.username,
        password: fields.password,
      });

      setTimeout(() => {
        navigate("/posts");
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      toast.error("An unexpected error occurred.", { theme: "colored" });
    }
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="mt-3">
      <div className="row">
        <div className="col-6">
          <div className="text-center">
            <img src={CatLogo} />
          </div>
          <h1>Login</h1>
          {hasLoginError && (
            <div className="alert alert-danger">
              The email address or password does not exist.
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <Input
              name="username"
              label="Email Address"
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
    </div>
  );
}
