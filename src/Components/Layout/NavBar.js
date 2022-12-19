import React, { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "../UI/Button";
const NavigationBar = (props) => {
  let Links = [
    { name: "Home", links: "/" },
    { name: "Portal", links: "/portal" },
    { name: "About Us", links: "/aboutus" },
  ];
  let [open, setopen] = useState(false);
  return (
    <Fragment>
      <div className="shadow-md w-full fixed top-0 left-0">
        <div className="md:flex bg-white items-center justify-between py-4 md:px-10 px-7">
          <div className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-gray-800">
            <span className="text-3xl text-indigo-600 mr-1 pt-2">
              <ion-icon name="logo-ionic"></ion-icon>
            </span>
            Disaster Portal
          </div>
          <div
            onClick={() => setopen(!open)}
            className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden "
          >
            <ion-icon name={open ? "close" : "menu"}></ion-icon>
          </div>
          <div
            className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
              open ? "top-20 opacity-100" : "top-[-490px]"
            }`}
          >
            {Links.map((link) => (
              <div className="md:ml-8 text-xl md:my-0 my-7">
                <NavLink
                  className="text-gray-800 hover:text-gray-400 duration-500"
                  to={link.links}
                >
                  {link.name}
                </NavLink>
              </div>
            ))}
            <Button>Login</Button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default NavigationBar;
