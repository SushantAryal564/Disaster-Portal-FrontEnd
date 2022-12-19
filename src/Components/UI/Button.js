import React from "react";
import { Link } from "react-router-dom";

export const Button = (props) => {
  return (
    <Link
      className="bg-red-600 text-xl text-white font-[Poppins] font-bold py-2 px-6 rounded md:ml-8 hover:shadow-xl duration-500"
      to="/login"
    >
      {props.children}
    </Link>
  );
};
