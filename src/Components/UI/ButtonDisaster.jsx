import React from "react";
import { useDispatch } from "react-redux";
import { slidebarAction } from "../../store/Slices/uiSlice";
const ButtonDisaster = ({ name, Icon, handler }) => {
  const dispatch = useDispatch();
  const changeSlidebarState = () => {
    dispatch(slidebarAction.changeSlidebarState());
    handler();
  };
  return (
    <button
      className=" bg-gray-50 border w-full text-center text-xs self-center pt-2 pb-2 font-semibold  text-slate-600 cursor-pointer hover:text-[#e35163]"
      onClick={changeSlidebarState}
    >
      <div className="text-center pb-2">
        <Icon sx={{ fontSize: 33 }} />
      </div>
      {name}
    </button>
  );
};

export default ButtonDisaster;
