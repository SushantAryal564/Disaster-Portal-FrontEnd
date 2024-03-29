import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Home from "./Components/Pages/Home";
import LoginSignUp from "./Components/Pages/LoginSignup";
import ManageDisaster from "./Components/Pages/ManageDisaster";
import Portal from "./Components/Pages/Portal";
import "leaflet/dist/leaflet.css";
import { getToken } from "./services/localStorageService";
import { getUserInformation } from "./services/localStorageService";
import { setUserToken, setUserInfo } from "./store/Slices/authSlice";
import ManageDisasterMap from "./Components/Map Layer/ManageDisasterMap";
import ManageDisasterOther from "./Components/Pages/ManageDisasterOther";
function App() {
  const dispatch = useDispatch();
  let { access_token } = getToken();
  let { WardId, IsWard, IsMunicipality, wardNumber } = getUserInformation();
  useEffect(() => {
    dispatch(setUserToken({ access_token: access_token }));
  }, [access_token, dispatch]);
  useEffect(() => {
    dispatch(setUserInfo({ WardId, IsWard, IsMunicipality, wardNumber }));
  }, [WardId]);
  return (
    <Routes>
      <Route path="/" element={<Portal />} />
      <Route path="/login" element={<LoginSignUp />} />
      <Route path="/managedisaster" element={<ManageDisaster />} />
      <Route path="/manage" element={<ManageDisasterOther />} />
    </Routes>
  );
}

export default App;
