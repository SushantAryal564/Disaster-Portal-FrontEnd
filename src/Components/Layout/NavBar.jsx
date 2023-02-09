import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { getToken } from "../../services/localStorageService";
import { removeToken } from "../../services/localStorageService";
import { unSetUserToken } from "../../store/Slices/authSlice";
import { useDispatch } from "react-redux";
const NavigationBar = () => {
  const { access_token } = getToken();
  const dispatch = useDispatch();
  let Links = [
    { name: "Home", links: "/" },
    { name: "Portal", links: "/portal" },
    { name: "Manage-Disaster", links: "/managedisaster" },
  ];
  const logoutHandler = () => {
    removeToken();
    dispatch(unSetUserToken(null));
  };
  let [open, setopen] = useState(false);
  let key = 0;
  return (
    <div className="shadow-md w-full">
      <div className="md:flex	 items-center justify-between md:pr-2 pr-15">
        <div className="font-bold text-xl cursor-pointer flex items-center  text-gray-800">
          <span className="text-sm text-white bg-teal-500 p-2">
            {/* <ion-icon name="flame-sharp"></ion-icon> */} LMC Disaster Portal
          </span>
        </div>
        <div
          onClick={() => setopen(!open)}
          className="text-3xl absolute right-8 top-3 cursor-pointer md:hidden "
        >
          <ion-icon name={open ? "close" : "menu"}></ion-icon>
        </div>
        <div
          className={`lg:bg-white md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[1] left-0 w-full md:w-auto md:pl-0 pl-9 ${
            open ? "top-15 bg-gray-400 bg-opacity-90" : "top-[-490px]	"
          }`}
        >
          {Links.map((link) => (
            <div className="md:ml-8 text-lg md:my-0 my-7 " key={key++}>
              <NavLink
                className="text-gray-800 hover:text-gray-400 duration-500"
                to={link.links}
              >
                {link.name}
              </NavLink>
            </div>
          ))}
          {access_token ? (
            <Link
              className="bg-red-600 text-xl text-white font-[Aerial] font-bold py-0.5 px-2 rounded md:ml-8 hover:shadow-xl duration-500"
              to="/login"
              onClick={logoutHandler}
            >
              LogOut
            </Link>
          ) : (
            <Link
              className="bg-red-600 text-xl text-white font-[Aerial] font-bold py-0.5 px-2 rounded md:ml-8 hover:shadow-xl duration-500"
              to="/login"
            >
              LogIn
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
export default NavigationBar;
