import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import HelpIcon from "@mui/icons-material/Help";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import ReportIcon from "@mui/icons-material/Report";
import InfoIcon from "@mui/icons-material/Info";
import ButtonDisaster from "../UI/ButtonDisaster";
import ArticleIcon from "@mui/icons-material/Article";
import AssignmentIcon from "@mui/icons-material/Assignment";
import FeedbackIcon from "@mui/icons-material/Feedback";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useDispatch } from "react-redux";
import { setComponent } from "../../store/Slices/hope";
import {
  DASHBOARD,
  INCIDENT,
  DAMAGELOSS,
  RISKINFO,
  REALTIME,
  REPORT,
  DATA,
  SITUATION,
  FEEDBACK,
} from "./../../store/constant";
export const SideBar = () => {
  const dispatch = useDispatch();
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
  const handletoggleReportAnAncident = (event) => {
    dispatch(setComponent(REPORT));
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
      name: REPORT,
      icon: ReportIcon,
      handler: handletoggleReportAnAncident,
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
    {
      name: FEEDBACK,
      icon: FeedbackIcon,
      handler: handletoggleDataFeedback,
    },
  ];
  return (
    <div className="w-20 border border-dashed shadow-md  flex flex-col  justify-start">
      {buttonInfo.map((button) => (
        <ButtonDisaster
          name={button.name}
          Icon={button.icon}
          handler={button.handler}
        />
      ))}
    </div>
  );
};
