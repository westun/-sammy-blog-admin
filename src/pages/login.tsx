import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import Joi from "joi";
import Input from "./../components/common/input";
import { useNavigate } from "react-router-dom";
import LoadingCat from "../components/common/loadingCat";
import { login } from "../services/authService";
import CatLogo from "../assets/images/cat_logo.png";
import { isAuthenticated } from "./../services/authService";

export default function Login() {
  const [fields, setFields] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState<any>({});
  const [hasLoginError, setHasLoginError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  if (isAuthenticated()) {
    //don't know why using setTimeout causes this to work
    setTimeout(() => {
      return navigate("/posts");
    }, 1);
  }

  const schema = {
    username: Joi.string().required().label("Email Address"),
    password: Joi.string().required().label("Password"),
  };

  const schemaObj = Joi.object(schema);

  function handleFieldChange(e: ChangeEvent<HTMLInputElement>) {
    const newFields: any = { ...fields };
    newFields[e.target.name] = e.target.value;
    setFields(newFields);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setErrors({});

    const { error } = schemaObj.validate(fields, { abortEarly: false });
    if (!error) {
      return doSubmit();
    }

    const errorsObj: any = {};
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
        //to fix bug with token not being retreived from session storage after logging in
        window.location.reload();
      }, 2000);
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        setHasLoginError(true);
      }

      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }

  if (isLoading) {
    return <LoadingCat />;
  }

  return (
    <div className="mt-3">
      <div className="row">
        <div className="col-lg-6">
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
