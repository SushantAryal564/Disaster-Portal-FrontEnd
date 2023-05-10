import React from "react";
import { useDispatch } from "react-redux";
import { slidebarAction } from "../../store/Slices/uiSlice";
import { useSelector } from "react-redux";
const ButtonDisaster = ({ name, Icon, handler, sidebarSelected }) => {
  const dispatch = useDispatch();
  const slideState = useSelector((state) => {
    return state.slidebar.slidebarState;
  });
  const currentmodule = useSelector((state) => {
    return state.component;
  });
  const changeSlidebarState = () => {
    if (!slideState || currentmodule == name) {
      dispatch(slidebarAction.changeSlidebarState());
    }
    handler();
  };
  return (
    <button
      className={`py-1 bg-[#ffffff] border w-full text-center text-xs self-center h-[10%] font-semibold cursor-pointer hover:text-[#e35163] ${
        sidebarSelected == name && "text-[#e35163"
      }`}
      onClick={changeSlidebarState}
    >
      <div className="text-center pb-2">
        <Icon sx={{ fontSize: 25 }} />
      </div>
      {name}
    </button>
  );
};

export default ButtonDisaster;
