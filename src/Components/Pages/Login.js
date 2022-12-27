import React from "react";
import Layout from "../Layout/Layout";
import image from "./../../assests/image.jpg";
import useInput from "../../hooks/formValidationHook";
import { useState } from "react";
import Register from "./RegisterPage";
import SignupForm from "./RegisterPage";
const Login = (props) => {
  const [registerVisibility, setRegisterVisiblity] = useState(false);
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueInputHandler: emailChangedHandler,
    rest: resetEmailInput,
    BlurHandler: emailBlurHandler,
  } = useInput((value) => value.includes("@"));

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
  const formSubmissionHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    resetEmailInput();
    resetPasswordInput();
  };
  const registrationVisiblityHandler = () => {
    setRegisterVisiblity(true);
    console.log(registerVisibility);
  };
  return (
    <Layout>
      <section className="h-fit">
        <div className="px-6 h-full text-gray-800">
          <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
            <div className=" pt-5 grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
              <img src={image} className="w-full" alt="Image of disaster" />
            </div>
            <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
              <form onSubmit={formSubmissionHandler}>
                <div className="flex flex-row items-center justify-center lg:justify-start">
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
                    <p className="text-red-600">
                      Email is not valid must contain @
                    </p>
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

                <div className="text-center lg:text-left">
                  <button
                    disabled={!formIsValid}
                    className={
                      formIsValid
                        ? "formIsVainline-block px-7 py-3 bg-red-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                        : "cursor-not-allowed formIsVainline-block px-7 py-3 bg-gray-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md"
                    }
                  >
                    Login
                  </button>
                  <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                    Don't have an account?&nbsp;&nbsp;
                    <button
                      onClick={registrationVisiblityHandler}
                      className=" text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out text-sm font-semibold mb-0 inline cursor-pointer"
                    >
                      {" "}
                      Register
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <SignupForm />
    </Layout>
  );
};
export default Login;
