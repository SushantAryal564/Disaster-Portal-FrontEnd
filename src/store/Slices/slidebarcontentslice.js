import { createSlice } from "@reduxjs/toolkit";
import Incident from "../../Sidebar/incident";
import Dashboard from "../../Sidebar/dashboard";
import DamageLoss from "../../Sidebar/damageLoss";
import RiskInfo from "../../Sidebar/riskinfo";
import { LiveData } from "../../Sidebar/realtime";
import ReportAnAncident from "../../Sidebar/reportIncident";
import DataArchieve from "../../Sidebar/dataArchive";
import Situation from "../../Sidebar/situation";
import Feedback from "../../Sidebar/feedback";
const initialState = {
  selectedSlidebarComponent: <Dashboard />,
};
const SlidebarContentSlice = createSlice({
  name: "slidebarContent",
  initialState,
  reducers: {
    selectedDashboard(state) {
      state.selectedSlidebarComponent = <Dashboard />;
    },
    selectedIncident(state) {
      state.selectedSlidebarComponent = <Incident />;
    },
    selectedDamageLoss(state) {
      state.selectedSlidebarComponent = <DamageLoss />;
    },
    selectedRiskInfo(state) {
      state.selectedSlidebarComponent = <RiskInfo />;
    },
    selectedRealTime(state) {
      state.selectedSlidebarComponent = <LiveData />;
    },
    selectedReportIncident(state) {
      state.selectedSlidebarComponent = <ReportAnAncident />;
    },
    selectedDataArchieve(state) {
      state.selectedSlidebarComponent = <DataArchieve />;
    },
    selectedSituationReport(state) {
      state.selectedSlidebarComponent = <Situation />;
    },
    selectedFeedback(state) {
      state.selectedSlidebarComponent = <Feedback />;
    },
  },
});
export const slidebarContentActions = SlidebarContentSlice.actions;
export default SlidebarContentSlice.reducer;
