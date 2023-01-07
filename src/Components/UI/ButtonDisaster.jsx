import React from "react";

const ButtonDisaster = ({ name, Icon }) => {
  return (
    <div className=" bg-gray-50 border w-full text-center text-xs self-center pt-2 pb-2 font-semibold  text-slate-600 cursor-pointer hover:text-[#e35163]">
      <div className="text-center pb-2">
        <Icon sx={{ fontSize: 33 }} />
      </div>
      {name}
    </div>
  );
};

export default ButtonDisaster;
