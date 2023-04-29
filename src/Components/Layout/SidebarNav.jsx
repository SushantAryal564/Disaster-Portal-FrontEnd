import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import HelpIcon from "@mui/icons-material/Help";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import ReportIcon from "@mui/icons-material/Report";
import InfoIcon from "@mui/icons-material/Info";
import LoginIcon from "@mui/icons-material/Login";
import ButtonDisaster from "../UI/ButtonDisaster";
import LogoutIcon from "@mui/icons-material/Logout";
import ArticleIcon from "@mui/icons-material/Article";
import AssignmentIcon from "@mui/icons-material/Assignment";
import FeedbackIcon from "@mui/icons-material/Feedback";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import { useDispatch } from "react-redux";
import { getToken } from "../../services/localStorageService";
import { setComponent } from "../../store/Slices/hope";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  DASHBOARD,
  INCIDENT,
  DAMAGELOSS,
  RISKINFO,
  REALTIME,
  DATA,
  SITUATION,
  FEEDBACK,
} from "./../../store/constant";
import { removeToken } from "../../services/localStorageService";
import { unSetUserToken } from "../../store/Slices/authSlice";
import { useEffect } from "react";
export const SideBar = ({ changeReportState }) => {
  const sidebarSelected = useSelector((state) => {
    return state.component;
  });
  const { access_token } = getToken();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    removeToken();
    dispatch(unSetUserToken(null));
  };
  const handletoggleDashboard = (event) => {
    dispatch(setComponent(DASHBOARD));
  };
  const handletoggleIncident = (event) => {
    dispatch(setComponent(INCIDENT));
  };
  const handletoggleDamageLoss = (event) => {
    dispatch(setComponent(DAMAGELOSS));
  };
  const handletoggleRiskInfo = (event) => {
    dispatch(setComponent(RISKINFO));
  };
  const handletoggleRealTime = (event) => {
    dispatch(setComponent(REALTIME));
  };
  const handletoggleDataArchieve = (event) => {
    dispatch(setComponent(DATA));
  };
  const handletoggleSituation = (event) => {
    dispatch(setComponent(SITUATION));
  };
  const handletoggleDataFeedback = (event) => {
    dispatch(setComponent(FEEDBACK));
  };
  useEffect(() => {}, [access_token]);
  const buttonInfo = [
    {
      name: DASHBOARD,
      icon: HomeIcon,
      handler: handletoggleDashboard,
    },
    {
      name: INCIDENT,
      icon: HelpIcon,
      handler: handletoggleIncident,
    },
    {
      name: DAMAGELOSS,
      icon: AccessTimeFilledIcon,
      handler: handletoggleDamageLoss,
    },
    {
      name: RISKINFO,
      icon: InfoIcon,
      handler: handletoggleRiskInfo,
    },
    {
      name: REALTIME,
      icon: AccessTimeIcon,
      handler: handletoggleRealTime,
    },
    {
      name: DATA,
      icon: ArticleIcon,
      handler: handletoggleDataArchieve,
    },
    {
      name: SITUATION,
      icon: AssignmentIcon,
      handler: handletoggleSituation,
    },
  ];
  return (
    <div className="w-16 absolute right-0 z-50 h-screen border border-dashed shadow-md  flex flex-col  justify-start scrollbar scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-w-0 scrollbar-rounded-rounded-md">
      {buttonInfo.map((button) => (
        <ButtonDisaster
          name={button.name}
          Icon={button.icon}
          handler={button.handler}
          sidebarSelected={sidebarSelected}
        />
      ))}
      <Link
        className=" bg-[#ffffff]  w-full text-center text-[0.7rem] self-center pt-1 pb-1 font-semibold  text-slate-600 cursor-pointer hover:text-[#e35163] no-underline"
        to={access_token ? "/managedisaster" : "/login"}
      >
        <div className="text-center pb-2">
          <SettingsApplicationsIcon sx={{ fontSize: 25 }} />
        </div>
        Manage Disaster
      </Link>
      <button
        className=" bg-[#ffffff]   w-full text-center text-xs self-center pt-2 pb-2 font-semibold  text-slate-600 cursor-pointer hover:text-[#e35163]"
        onClick={changeReportState}
      >
        <div className="text-center pb-2">
          <ReportIcon sx={{ fontSize: 25 }} />
        </div>
        Report
      </button>
      {access_token ? (
        <Link
          className=" bg-[#ffffff]  w-full text-center text-xs self-center pt-2 pb-2 font-semibold  text-slate-600 cursor-pointer hover:text-[#e35163] no-underline"
          onClick={logoutHandler}
          to="/login"
        >
          <div className="text-center pb-2">
            <LogoutIcon sx={{ fontSize: 25 }} />
          </div>
          Logout
        </Link>
      ) : (
        <Link
          className=" bg-[#ffffff] w-full text-center text-xs self-center pt-2 pb-2 font-semibold  text-slate-600 cursor-pointer hover:text-[#e35163] no-underline"
          to="/login"
        >
          <div className="text-center pb-2">
            <LoginIcon sx={{ fontSize: 25 }} />
          </div>
          Login
        </Link>
      )}
    </div>
  );
};
