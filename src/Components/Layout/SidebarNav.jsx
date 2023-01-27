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
import Dashboard from "../../Sidebar/dashboard";
import Incident from "../../Sidebar/incident";
import DamageLoss from "../../Sidebar/damageLoss";
import RiskInfo from "../../Sidebar/riskinfo";
import RealTime from "../../Sidebar/realtime";
import ReportAnAncident from "../../Sidebar/reportIncident";
import DataArchieve from "../../Sidebar/dataArchive";
import Situation from "../../Sidebar/situation";
import Feedback from "@mui/icons-material/Feedback";

export const SideBar = ({ changeSlidebarContent }) => {
  const handletoggleDashboard = (event) => {
    changeSlidebarContent(<Dashboard />);
  };
  const handletoggleIncident = (event) => {
    changeSlidebarContent(<Incident />);
  };

  const handletoggleDamageLoss = (event) => {
    changeSlidebarContent(<DamageLoss />);
  };
  const handletoggleRiskInfo = (event) => {
    changeSlidebarContent(<RiskInfo />);
  };
  const handletoggleRealTime = (event) => {
    changeSlidebarContent(<RealTime />);
  };
  const handletoggleReportAnAncident = (event) => {
    changeSlidebarContent(<ReportAnAncident />);
  };
  const handletoggleDataArchieve = (event) => {
    changeSlidebarContent(<DataArchieve />);
  };
  const handletoggleSituation = (event) => {
    changeSlidebarContent(<Situation />);
  };
  const handletoggleDataFeedback = (event) => {
    changeSlidebarContent(<Feedback />);
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
