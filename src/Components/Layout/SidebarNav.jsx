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
export const SideBar = () => {
  const dispatch = useDispatch();
  const handletoggleDashboard = (event) => {
    dispatch(setComponent("Dashboard"));
  };
  const handletoggleIncident = (event) => {
    dispatch(setComponent("Incident"));
  };
  const handletoggleDamageLoss = (event) => {
    dispatch(setComponent("DamageLoss"));
  };
  const handletoggleRiskInfo = (event) => {
    dispatch(setComponent("RiskInfo"));
  };
  const handletoggleRealTime = (event) => {
    dispatch(setComponent("RealTime"));
  };
  const handletoggleReportAnAncident = (event) => {
    dispatch(setComponent("Report"));
  };
  const handletoggleDataArchieve = (event) => {
    dispatch(setComponent("DataArchieve"));
  };
  const handletoggleSituation = (event) => {
    dispatch(setComponent("Situation"));
  };
  const handletoggleDataFeedback = (event) => {
    dispatch(setComponent("Feedback"));
  };
  const buttonInfo = [
    {
      name: "Dashboard",
      icon: HomeIcon,
      handler: handletoggleDashboard,
    },
    {
      name: "Incident",
      icon: HelpIcon,
      handler: handletoggleIncident,
    },
    {
      name: "Damage & Loss",
      icon: AccessTimeFilledIcon,
      handler: handletoggleDamageLoss,
    },
    {
      name: "Risk Info",
      icon: InfoIcon,
      handler: handletoggleRiskInfo,
    },
    {
      name: "Real Time",
      icon: AccessTimeIcon,
      handler: handletoggleRealTime,
    },
    {
      name: "Report an Incident",
      icon: ReportIcon,
      handler: handletoggleReportAnAncident,
    },
    {
      name: "Data Archieve",
      icon: ArticleIcon,
      handler: handletoggleDataArchieve,
    },
    {
      name: "Situation Report",
      icon: AssignmentIcon,
      handler: handletoggleSituation,
    },
    {
      name: "Feedback",
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
