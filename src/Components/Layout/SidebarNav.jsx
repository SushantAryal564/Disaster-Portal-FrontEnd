import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import HelpIcon from "@mui/icons-material/Help";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import ReportIcon from "@mui/icons-material/Report";
import InfoIcon from "@mui/icons-material/Info";
export const SideBar = () => {
  return (
    <div className="flex flex-col  justify-around gap-4">
      <div className="text-xs self-center pt-2 pb-2 font-semibold  text-slate-600 cursor-pointer hover:text-[#e35163]">
        <div className="text-center">
          <HomeIcon sx={{ fontSize: 30 }} />
        </div>
        Dashboard
      </div>
      <div className="text-xs self-center pt-2 pb-2 font-semibold text-slate-600 cursor-pointer hover:text-[#e35163]">
        <div className="text-center">
          <HelpIcon sx={{ fontSize: 30 }} />
        </div>
        Incident
      </div>
      <div className="text-xs self-center pt-2 pb-2 font-semibold text-center text-slate-600 hover:text-[#e35163] cursor-pointer">
        <div className="text-center">
          <AccessTimeFilledIcon sx={{ fontSize: 30 }} />
        </div>
        Damage &<br /> Loss
      </div>
      <div className="text-xs self-center pt-2 pb-2 font-semibold text-slate-600 hover:text-[#e35163] cursor-pointer">
        <div className="text-center">
          <InfoIcon sx={{ fontSize: 30 }} />
        </div>
        Risk Info
      </div>
      <div className="text-xs self-center pt-2 pb-2 font-semibold text-center text-slate-600 hover:text-[#e35163] cursor-pointer">
        <div className="text-center">
          <ReportIcon sx={{ fontSize: 30 }} />
        </div>
        Report an <br /> incident
      </div>
    </div>
  );
};
