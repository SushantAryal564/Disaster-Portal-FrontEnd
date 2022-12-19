import React from "react";

export const Button = (props) => {
  return (
    <button className="bg-indigo-600 text-xl text-white font-[Poppins] font-bold py-2 px-6 rounded md:ml-8 hover:shadow-xl duration-500">
      {props.children}
    </button>
  );
};
