import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setpanel } from "../store/Slices/riskinfoSlice";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
export const Option = () => {
  const dispatch = useDispatch();
  const [pageNumber, changePageNumber] = useState(1);
  const IncreaseClickHandler = () => {
    if (pageNumber == 4) {
      changePageNumber(1);
    }
    changePageNumber(pageNumber + 1);
  };
  const DecreaseClickHandler = () => {
    if (pageNumber == 1) {
      changePageNumber(4);
    }
    changePageNumber(pageNumber - 1);
  };
  return (
    <div className="mt-3">
      <div className="absolute right-0 pr-3">
        <ChevronLeftIcon onClick={DecreaseClickHandler} />
        <ChevronRightIcon onClick={IncreaseClickHandler} />
      </div>
      <nav aria-label="Page navigation example ">
        <ul className="inline-flex items-center -space-x-px">
          <li>
            <div
              onClick={() => dispatch(setpanel("population"))}
              className="cursor-pointer px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              1
            </div>
          </li>
          <li>
            <div
              onClick={() => dispatch(setpanel("imagery"))}
              className=" cursor-pointer px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              2
            </div>
          </li>

          <li>
            <div
              onClick={() => dispatch(setpanel("criticalinfrastructure"))}
              className=" cursor-pointer px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              3
            </div>
          </li>
          <li>
            <div
              onClick={() => dispatch(setpanel("hazard"))}
              className=" cursor-pointer px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              4
            </div>
          </li>
          <li></li>
        </ul>
      </nav>
    </div>
  );
};
