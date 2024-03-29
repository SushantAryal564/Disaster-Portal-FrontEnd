import React, { useState } from "react";
import Layout from "../Layout/Layout";
import image from "./../../assests/image.jpg";
import Login from "../Form/loginForm";
import SignupForm from "../Form/RegistrationForm";
const LoginSignUp = (props) => {
  return (
    <Layout>
      <section>
        <div className="px-6 h-full text-gray-800">
          <div className="flex items-center xl:justify-center lg:justify-between justify-center flex-wrap h-full g-6">
            <div className=" pt-5  grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
              <img src={image} className="w-full" alt="Image of disaster" />
            </div>
            <div
              className={`  xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0`}
            >
              <Login />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default LoginSignUp;
