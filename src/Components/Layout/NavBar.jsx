import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { authAction } from "../../store/authenticaltionSlice";
const NavigationBar = () => {
  let Links = [
    { name: "Home", links: "/" },
    { name: "Portal", links: "/portal" },
    { name: "About Us", links: "/aboutus" },
  ];
  let [open, setopen] = useState(false);
  let key = 0;
  return (
    <div className="shadow-md w-full">
      <div className="md:flex	 items-center justify-between py-0.5 md:px-10 px-15">
        <div className="font-bold text-xl cursor-pointer flex items-center font-[Aerial] text-gray-800">
          <span className="text-3xl text-red-600 mr-1 pt-2">
            <ion-icon name="flame-sharp"></ion-icon>
          </span>
          Disaster Portal
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
          {/*{isLogged_In ? (
            <AccountCircleIcon
              onClick={loginHandler}
              style={{ fontSize: 45 }}
              className="bg-red-600 text-xl text-white font-[Aerial] font-bold py-0.5 px-2 rounded md:ml-8 hover:shadow-xl duration-500"
            />
          ) : (
            <Link
              className="bg-red-600 text-xl text-white font-[Aerial] font-bold py-0.5 px-2 rounded md:ml-8 hover:shadow-xl duration-500"
              to="/login"
            >
              Log In
            </Link>
          )}*/}
        </div>
      </div>
    </div>
  );
};
export default NavigationBar;
