import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { LayersControl, MapContainer, Marker, TileLayer } from "react-leaflet";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import MarkerClusterGroup from "react-leaflet-cluster";
import {
  useGetActivityQuery,
  useUpdateActivityMutation,
} from "../../services/MuniClusManage";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { BiAlarm } from "react-icons/bi";
import Headers from "./../../../src/Sidebar/Header";
import WardjsonLoader from "../Map Layer/WardjsonLoader";
import Markers from "../UI/Marker";
import L from "leaflet";

const ManageDisasterOther = () => {
  const isMunicipalityUser = useSelector((state) => state.auth.isMunicipality);
  const isCluster = useSelector((state) => state.auth.isCluster);
  const [slidebarState, setSlidebarState] = useState(true);
  const [disasterEvent, setDisasterEvent] = useState();
  const getDisasterData = async () => {
    const data = await fetch(
      "http://127.0.0.1:8000/api/v1/disaster/disasterEventwithoutgeom/"
    );
    const disasterData = await data.json();
    setDisasterEvent(disasterData);
  };
  useEffect(() => {
    getDisasterData();
  }, []);
  const createClusterCustomIcon = function (cluster) {
    return L.divIcon({
      html: `<span>${cluster.getChildCount()}</span>`,
      className: "marker-cluster-custom",
      iconSize: L.point(35, 35, true),
    });
  };
  const [DisasterId, setDisasterID] = useState(0);
  const { data: DisasterActivityLog, isLoading: activityIsLoading } =
    useGetActivityQuery(DisasterId);
  const DisasterActivityLogHandler = (id) => {
    setDisasterID(id);
  };
  const [open, setOpen] = useState(0);
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  const [date, setDate] = useState("");
  const [activity, setActivity] = useState("");
  function Icon({ id, open }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${
          id === open ? "rotate-180" : ""
        } h-5 w-5 transition-transform`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    );
  }
  const ActivityLogLayout = activityIsLoading
    ? ""
    : DisasterActivityLog.map((data) => {
        return (
          <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
            <li class="pb-3 sm:pb-4">
              <div className="text-lg font-bold">{data.action_name}</div>
              <div className="text-xs text-black">
                {`${new Date(data.time_of_action).getFullYear()}/${(
                  new Date(data.time_of_action).getMonth() + 1
                )
                  .toString()
                  .padStart(2, "0")}/${new Date(data.time_of_action)
                  .getDate()
                  .toString()
                  .padStart(2, "0")} ${new Date(
                  data.time_of_action
                ).toLocaleTimeString()}`}
              </div>
              <div>{data.logCreator}</div>
            </li>
          </ul>
        );
      });
  let formIsValid = false;
  if (activity.trim() !== "" || date !== "") {
    formIsValid = true;
  }
  let creator;
  if (isMunicipalityUser) creator = "Municipality";
  else if (isCluster) creator = "Cluster";
  else creator = "Ward";

  const [updateActivity] = useUpdateActivityMutation(DisasterId);
  const ActivityFormSubmitHandler = (e) => {
    e.preventDefault();
    let data = {
      disaster: DisasterId,
      action_name: activity,
      deployed_inventory: 1,
      time_of_action: date,
      logCreator: creator,
    };
    setActivity("");
    setDate();
    updateActivity(data);
  };
  const DisasterEventLayout = disasterEvent?.map((data) => {
    return (
      <div className="px-4 border-2 mx-2">
        <Accordion
          open={open === data.id}
          icon={<Icon id={data.id} open={open} />}
        >
          <AccordionHeader
            onClick={() => {
              handleOpen(data.id);
            }}
          >
            <div
              onClick={() => {
                DisasterActivityLogHandler(data.id);
              }}
            >
              <div className="text-md font-medium flex flex-row">
                <div className="text-red-500 flex flex-col">
                  <span className="px-3"></span>
                  <p className="text-sm text-black mx-6 my-1">
                    {data?.type?.title || "none"}
                  </p>
                </div>
                <div className="font-normal ml-2 mt-1 pt-1 text-sm">
                  <div className="font-semibold text-lg flex justify-start">
                    {" "}
                    {data.name}
                  </div>
                  <div>
                    <div className="text-xs  text-gray-500 flex justify-start ">
                      <div className="flex items-center my-1">
                        <span>
                          <BiAlarm />
                        </span>
                        <span className="mx-2">
                          {data.date_event.slice(0, 10)}
                        </span>
                        <span className="ml-2">
                          {data.date_event.slice(11, 16)}
                        </span>
                        <span className="ml-2">WARD-{data.Ward.ward}</span>
                        <span className="ml-3">
                          {data.ADDRESS || "Dhapakhel,Gems School"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AccordionHeader>
          <AccordionBody>
            {ActivityLogLayout}
            <form className="w-full max-w-lg">
              <div class="w-full px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-password"
                >
                  Update Response Activity
                </label>
                <textarea
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  placeholder="Type response Activity Here....."
                  required
                  value={activity}
                  onChange={(event) => setActivity(event.target.value)}
                ></textarea>
              </div>
              <div class="flex flex-wrap w-full">
                <div class="w-full md:w-1/2 px-3">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-last-name"
                  >
                    Time
                  </label>
                  <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-3"
                    id="grid-last-name"
                    type="datetime-local"
                    placeholder="Doe"
                    value={date}
                    onChange={(event) => setDate(event.target.value)}
                    required
                  />
                </div>
              </div>
              <div class="px-3 md:items-center">
                <div class="md:w-2/3">
                  <button
                    class="shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    type="button"
                    onClick={ActivityFormSubmitHandler}
                    disabled={!formIsValid}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </AccordionBody>
        </Accordion>
      </div>
    );
  });

  if (isMunicipalityUser || isCluster) {
    return (
      <div className="flex">
        <div
          className={`${
            slidebarState ? "w-1/2" : "w-0"
          } duration-300 h-[100vh] relative overflow-x-hidden scrollbar scrollbar-thumb-gray-300 overflow-y-scroll scrollbar-track-gray-100 scrollbar-w-1 scrollbar-rounded-rounded-md`}
        >
          <div>
            <Headers />
            <div>
              <div className="text-lg px-4 text-[#e35163]">
                Disaster Response Activity
              </div>
              <div className="col-span-4">{DisasterEventLayout}</div>
            </div>
          </div>
          <NavigateNextIcon
            style={{
              maxWidth: "30px",
              maxHeight: "50px",
              minWidth: "30px",
              minHeight: "50px",
            }}
            className={`
              bg-white absolute cursor-pointer -right-[30px] top-1/2 w-7 border-2 z-20  ${
                slidebarState ? "rotate-180 rounded-l-lg" : "rounded-r-lg"
              }`}
            onClick={() => setSlidebarState(!slidebarState)}
          />
        </div>
        <MapContainer
          center={[27.671704, 85.316118]}
          zoom={14}
          scrollWheelZoom={true}
          className="mt-1 z-10"
        >
          <LayersControl position="topright">
            <LayersControl.BaseLayer name="OSM Streets">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="World Imagery">
              <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer checked name="Grey Imagery">
              <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png" />
            </LayersControl.BaseLayer>
          </LayersControl>
          <WardjsonLoader />
          <MarkerClusterGroup
            showCoverageOnHover={false}
            spiderfyDistanceMultiplier={2}
            iconCreateFunction={createClusterCustomIcon}
          >
            {disasterEvent?.map((event) => {
              return (
                <Markers disaster={event} key={event.id} setOpen={setOpen} />
              );
            })}
          </MarkerClusterGroup>
        </MapContainer>
      </div>
    );
  }
};

export default ManageDisasterOther;
