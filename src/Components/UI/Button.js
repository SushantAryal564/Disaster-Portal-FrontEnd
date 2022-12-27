import React from "react";

export const Button = (props) => {
  return (
    <button
      disabled={!props.formvalid}
      className={
        props.formvalid
          ? "formIsVainline-block px-7 py-3 bg-red-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
          : "cursor-not-allowed formIsVainline-block px-7 py-3 bg-gray-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md"
      }
    >
      {props.children}
    </button>
  );
};
