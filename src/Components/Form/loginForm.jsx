import React, { Fragment, useState, useEffect } from "react";
import useInput from "../../hooks/formValidationHook";
import { Button } from "../UI/Button";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "./../../services/auth.js";
import {
  getToken,
  storeToken,
  getUserInformation,
} from "./../../services/localStorageService.js";
import { setUserToken, setUserInfo } from "../../store/Slices/authSlice";
import { useDispatch } from "react-redux";

export const Login = (props) => {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [server_error, setServerError] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueInputHandler: emailChangedHandler,
    reset: resetEmailInput,
    BlurHandler: emailBlurHandler,
  } = useInput((value) => value.includes(""));

  const {
    value: enteredPassword,
    isValid: PasswordIsValid,
    hasError: passwordInputHasError,
    valueInputHandler: passwordInputHandler,
    reset: resetPasswordInput,
    BlurHandler: passwordBlurHandler,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;
  if (enteredEmailIsValid && PasswordIsValid) {
    formIsValid = true;
  }
  const formSubmissionHandler = async (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    const actualData = {
      username: enteredEmail,
      password: enteredPassword,
    };

    const res = await loginUser(actualData);
    if (res.message) {
      setServerError(res.message);
    }
    if (res.data) {
      console.log(res.data);
      storeToken(res.data);
      let { access_token } = getToken();
      dispatch(setUserToken({ access_token: access_token }));

      let { WardId, IsWard, IsMunicipality, wardNumber } = getUserInformation();
      console.log(" from log in, id WARD", WardId, "ward number", wardNumber);
      dispatch(setUserInfo({ WardId, IsWard, IsMunicipality, wardNumber }));
      navigate("/");
    }

    resetEmailInput();
    resetPasswordInput();
  };

  return (
    <Fragment>
      <form onSubmit={formSubmissionHandler}>
        <div className="flex flex-row items-center justify-center lg:justify-start mt-20">
          <p className="text-lg mb-0 mr-4 font-bold">SIGN IN</p>
        </div>

        <div className="mb-6 pt-3">
          <input
            type="text"
            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Email address"
            value={enteredEmail}
            onChange={emailChangedHandler}
            onBlur={emailBlurHandler}
          />
          {emailInputHasError && (
            <p className="text-red-600">Email is invalid or blank</p>
          )}
        </div>

        <div className="mb-6">
          <input
            type="password"
            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Password"
            value={enteredPassword}
            onChange={passwordInputHandler}
            onBlur={passwordBlurHandler}
          />
          {passwordInputHasError && (
            <p className="text-red-600">Password must not be empty</p>
          )}
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            />
            <label
              className="form-check-label inline-block text-gray-800"
              htmlFor="exampleCheck2"
            >
              Remember me
            </label>
          </div>
          <a href="#!" className="text-gray-800">
            Forgot password?
          </a>
        </div>
        <div className="text-center lg:text-left pb-4">
          <Button formvalid={formIsValid}>sign in</Button>
          <p className="text-sm font-semibold mt-2 pt-1 mb-0">
            Don't have an account?&nbsp;&nbsp;
            <button
              type="submit"
              onClick={props.change}
              className=" text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out text-sm font-semibold mb-0 inline cursor-pointer"
            >
              {" "}
              Register
            </button>
          </p>
        </div>
      </form>
    </Fragment>
  );
};
export default Login;
