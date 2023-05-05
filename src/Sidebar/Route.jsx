import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AiFillInfoCircle } from "react-icons/ai";
import { BiAlarm } from "react-icons/bi";
import { disasterAsyncGETThunk } from "../store/Slices/disasterSlice";
import { useDispatch } from "react-redux";
import Header from "./Header";
import {
  setStartLocation,
  setDestinationLocation,
  PoliceStationGetAsyncThunk,
  HospitalGetAsyncThunk,
  FireStationGetAsyncThunk,
} from "../store/Slices/damageLegendSlice";
import Select from "react-select";
import { NavigationLegend } from "../Components/Legends/Legend";

function FindRoute() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(disasterAsyncGETThunk());
    dispatch(PoliceStationGetAsyncThunk());
    dispatch(HospitalGetAsyncThunk());
    dispatch(FireStationGetAsyncThunk());
  }, []);
  const disasterData = useSelector((state) => {
    return state.disaster.data;
  });
  console.log(disasterData, "I am disaster Data");
  const startLocationfrompanel = useSelector(
    (state) => state.damageLegend.startlocation
  );
  const hospitals = useSelector((state) => state.damageLegend.hospital);
  const policeStation = useSelector(
    (state) => state.damageLegend.policeStation
  );
  const fire_Station = useSelector((state) => state.damageLegend.fireStation);
  const HospitalOptions = hospitals?.features.map((feature) => {
    return {
      label: feature.properties.name,
      value: feature.geometry.coordinates,
    };
  });
  const FireStationOptions = fire_Station?.features.map((feature) => {
    return {
      label: feature.properties.name,
      value: feature.geometry.coordinates,
    };
  });
  const PoliceStationOptions = policeStation?.features.map((feature) => {
    return {
      label: feature.properties.name,
      value: feature.geometry.coordinates,
    };
  });
  const disasterOptions = disasterData.map((data) => {
    return {
      label: data.name,
      value: [data.long, data.lat],
    };
  });
  const [selectedHospitalOption, setSelectedHospitalOption] = useState(null);
  const [selectedPoliceStationOption, setSelectedPoliceStationOption] =
    useState(null);
  const [selectedFireStationOption, setSelectedFireStationOption] =
    useState(null);
  console.log(selectedHospitalOption, "selectedHospitalOption");
  const handleHospitalOptionChange = (selectedOption1) => {
    dispatch(
      setDestinationLocation([
        selectedOption1.value[1],
        selectedOption1.value[0],
      ])
    );
    setSelectedHospitalOption(selectedOption1);
    setSelectedPoliceStationOption(null);
    setSelectedFireStationOption(null);
  };
  const handlefireStationOptionChange = (selectedOption2) => {
    dispatch(
      setDestinationLocation([
        selectedOption2.value[1],
        selectedOption2.value[0],
      ])
    );
    setSelectedFireStationOption(selectedOption2);
    setSelectedHospitalOption(null);
    setSelectedPoliceStationOption(null);
  };
  const handlepoliceStationOptionChange = (selectedOption3) => {
    dispatch(
      setDestinationLocation([
        selectedOption3.value[1],
        selectedOption3.value[0],
      ])
    );
    setSelectedFireStationOption(null);
    setSelectedHospitalOption(null);
    setSelectedPoliceStationOption(selectedOption3);
  };
  const handleDisasterOptionChange = (selectedOption) => {
    dispatch(
      setStartLocation([selectedOption.value[1], selectedOption.value[0]])
    );
  };
  const route = useSelector((state) => {
    console.log(state);
    return state.damageLegend.currentroute;
  });
  return (
    <div>
      <Header />

      <div className="h-[84vh] scrollbar scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-w-1 scrollbar-rounded-rounded-md px-4 flex flex-col gap-2 ">
        <div className=" mt-2 text-base font-bold border-b-2">
          Find the shortest Path between Disaster and critical Services
        </div>
        <div className="flex flex-col gap-2 border shadow-md rounded-md p-3 mt-2">
          <div>Select One among the Options:</div>
          <div>Hospital</div>
          <Select
            value={selectedHospitalOption}
            options={HospitalOptions}
            onChange={handleHospitalOptionChange}
          />
          <div>Fire Station</div>
          <Select
            value={selectedFireStationOption}
            options={FireStationOptions}
            onChange={handlefireStationOptionChange}
          />
          <div>Police Station</div>
          <Select
            value={selectedPoliceStationOption}
            options={PoliceStationOptions}
            onChange={handlepoliceStationOptionChange}
          />
        </div>
        <div className="border p-2 mt-4 shadow-md rounded-md">
          <div className="mb-2">Select Disaster Event</div>
          <Select
            defaultValue={"school"}
            options={disasterOptions}
            onChange={handleDisasterOptionChange}
          />
        </div>
        <div className="my-3">
          <div className="justify-between pb-1 items-start border rounded-md">
            <div className="bg-blue-400 text-white py-2 px-1">
              Navigation Panel
            </div>
            <div className="mt-2">
              <ul className="list-disc">
                {route?.features[0]?.properties?.segments[0].steps?.map(
                  (data) => {
                    return (
                      <li>
                        After {data.duration} minutes in {data.distance} meter,{" "}
                        {data.instruction}
                      </li>
                    );
                  }
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FindRoute;
