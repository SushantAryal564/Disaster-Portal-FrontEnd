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
export const SideBar = () => {
  const buttonInfo = [
    { name: "Dashboard", icon: HomeIcon },
    { name: "Incident", icon: HelpIcon },
    { name: "Damage & Loss", icon: AccessTimeFilledIcon },
    { name: "Risk Info", icon: InfoIcon },
    { name: "Real Time", icon: AccessTimeIcon },
    { name: "Report an Incident", icon: ReportIcon },
    { name: "Data Archieve", icon: ArticleIcon },
    { name: "Situation Report", icon: AssignmentIcon },
    { name: "Feedback", icon: FeedbackIcon },
  ];
  return (
    <div className="w-20 border border-dashed shadow-md  flex flex-col  justify-start">
      {buttonInfo.map((button) => (
        <ButtonDisaster name={button.name} Icon={button.icon} />
      ))}
    </div>
  );
};
