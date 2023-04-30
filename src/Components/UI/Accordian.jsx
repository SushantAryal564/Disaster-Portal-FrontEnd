import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeAll } from "../../store/Slices/featureSlice";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { AiOutlineAlert, AiOutlineExclamation } from "react-icons/ai";
import { BiAlarm } from "react-icons/bi";
import { useMap } from "react-leaflet";
import BarChart from "./Chart";
import { featureGroup } from "leaflet";
import { GetColor } from "./GetColor";
import { buffer } from "d3";
import HorizontalBarChart from "../Common/Chart/HorizontalBarChart";
// import {  ChartRe } from "./ChartRe";
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

export default function Accordian({ AllDisaster, latlngHandler }) {
  const [message, setmsg] = useState("Default");
  const latlng = useSelector((state) => {
    return state.latlng;
  });
  const buf = useSelector((state) => {
    return state.feature.bufferdistance;
  });
  const triggerAlert = async function sendAnalysisEmail(id) {
    const url = "http://127.0.0.1:8000/api/v1/analysis/email/";
    console.log(latlng, "your lat alANF", latlng[0], latlng[1], id, message);
    const data = {
      lat: latlng[0], // replace with the latitude value
      lng: latlng[1], // replace with the longitude value
      message: message,
      buf: buf,
      disaster_id: id,
    };
    console.log("o data", data);
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    console.log(responseData);
  };
  const dispatch = useDispatch();
  const [open, setOpen] = useState(0);
  // barchat data
  const bufferd = useSelector((state) => {
    //  console.log(state.manageDisaster)
    return state.feature.bufferdistance;
  });

  const builddata = useSelector((state) => {
    return state?.feature?.building;
  });
  const amen = useSelector((state) => {
    return state?.feature?.amenities;
  });
  const water = useSelector((state) => {
    return state?.feature?.waterbody;
  });
  const fores = useSelector((state) => {
    return state?.feature?.waterbody;
  });
  let data2 = [];
  let classCounts = {};
  if (builddata && builddata[0]) {
    data2 = [
      { name: "Building(s)", value: builddata[0].features.length },
      ...data2,
    ];
  }
  if (water && water[0]) {
    data2 = [...data2, { name: "Waterbody", value: water[0].features.length }];
  }
  if (fores && fores[0]) {
    data2 = [...data2, { name: "Forest", value: fores[0].features.length }];
  }
  if (amen && amen[0]) {
    data2 = [...data2, { name: "Amenities", value: amen[0].features.length }];
    amen[0].features.forEach((feature) => {
      const cls = feature.properties.classes;
      if (!classCounts[cls]) {
        classCounts[cls] = 1;
      } else {
        classCounts[cls]++;
      }
    });
  }
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const disaster = AllDisaster.map((data) => {
    return (
      <div className="border-2">
        <Accordion
          open={open === data.id}
          icon={<Icon id={data.id} open={open} />}
        >
          <AccordionHeader
            onClick={() => {
              handleOpen(data.id);
              dispatch(removeAll());
              latlngHandler([data.lat, data.long, bufferd]);
            }}
            className="text-sm py-0 px-2 py-2 border-gray-200 border-b-2  border-t-2"
          >
            <div className=" p-1  py-2">
              <div className="text-md font-medium flex flex-row ">
                <div className="text-red-500 text-sm flex flex-col">
                  <span className="px-3"></span>
                  <p className="text-xs text-black mx-6 my-1">
                    {data?.type?.title || "none"}
                  </p>
                </div>
                <span className="font-normal ml-2 mt-1 pt-1 text-sm">
                  <div className="font-semibold text-xs"> {data.name}</div>
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
                </span>
              </div>
            </div>
          </AccordionHeader>
          <AccordionBody>
            <div className="m-2 ">
              <span className="text-gray-500 text-bold  text-[12px] mb-2 mx-2 bg-blue-700 text-white py-2 px-2">
                INFRASTRUCTURES IN DISASTER AREA
              </span>

              <div className="mt-2 p-2 ">
                <div className="h-[400px]">
                  {data2.length > 0 && <HorizontalBarChart data={data2} />}
                </div>

                <div class="grid grid-cols-3 mt-3">
                  {Object.keys(classCounts).map((className) => {
                    let colorRGB = GetColor(className);
                    return (
                      <div
                        className="text-black  py-4 border-r-4 border-white"
                        key={className}
                        style={{
                          background: `rgb(${colorRGB[0]}, ${colorRGB[1]}, ${colorRGB[2]})`,
                        }}
                      >
                        <span className="px-4 text-xl,">
                          {className}(s):{classCounts[className]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <span className="mx-3 my-10 font-bold text-center items-center flex justify-center ">
              Trigger an Alert for this disaster <AiOutlineExclamation />
              <AiOutlineAlert className="px-.5" />
            </span>
            <div className="p-4 hover:text-black-500 rounded-sm bg-[#e35163] text-white">
              <div className="flex flex-start text-sm items-center">
                {/* < AiFillSetting/>Configure An Alert Setting */}
              </div>
              <div className="after: p-3">
                <label
                  htmlFor="latitude"
                  className="text-xs font-normal leading-tight text-black-500 transition-all font-bold mt-3"
                >
                  Type your message here
                </label>
                <input
                  id="latitude"
                  name="latitude"
                  type="text"
                  defaultValue={"Disaster Alert"}
                  onChange={(e) => {
                    dispatch(setmsg(e.target.value));
                  }}
                  className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-red-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  // className=""
                ></input>
              </div>
            </div>
            <p className="text-xs text-red-500 p-2 mx-3">
              By pressing you are sending an alert meassage to the selected
              region
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => triggerAlert(data.id)}
                className="mx-2 inline-block bg-danger px-6 pt-2.5 pb-2 my-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out  hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)]"
              >
                Trigger Alert{" "}
              </button>
            </div>
          </AccordionBody>
        </Accordion>
      </div>
    );
  });
  return <Fragment>{disaster}</Fragment>;
}
