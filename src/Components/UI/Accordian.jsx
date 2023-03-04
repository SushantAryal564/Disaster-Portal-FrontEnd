import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { removeAll } from "../../store/Slices/featureSlice";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { BiAlarm } from "react-icons/bi";
import { useMap } from "react-leaflet";
import BarChart from "./Chart";
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
  const dispatch = useDispatch();
  const [open, setOpen] = useState(0);
  // barchat data
  const data2 = [
    { name: 'Buildings', value: 10 },
    { name: 'Parks', value: 20 },
    { name: 'WaterBody', value: 15 },
    { name: 'Forest', value: 5 },
  ]
  //
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  console.log(AllDisaster);
  const disaster = AllDisaster.map((data) => (
    <Accordion
      open={open === data.id}
      icon={<Icon id={data.id} open={open} />}
    >
      <AccordionHeader
        onClick={() => {
          handleOpen(data.id);
          dispatch(removeAll());
          latlngHandler([data.lat, data.long]);
        }}
        className="text-sm py-0 px-2 py-2"
      >
        <div className="border-gray-200 border-b-2 p-1 hover:bg-gray-200 py-2">
            <div className="text-md font-medium flex flex-row ">
              <div className="text-red-500 text-sm flex flex-col">
                <span className="px-3">
                  {" "}
                  <img
                className="w-9 h-6 pt-1 mt-1"
                src={`http://127.0.0.1:8000/${data?.type?.title}.svg`}
                
              />  
                </span>
                <p className="text-xs text-black mx-6 my-1">{data?.type?.title || "none"}</p>
              </div>
              <span className="font-normal ml-2 mt-1 pt-1 text-sm">
                <div className="font-semibold text-xs"> {data.name}</div>
                <div>
                  <div className="text-xs  text-gray-500 flex justify-start ">
                   
                    <div className="flex items-center my-1">
                      <span>
                        <BiAlarm />
                      </span>
                      <span className="mx-2">{data.date_event.slice(0,10)}</span>
                      <span className="ml-2">{data.date_event.slice(11,16)}</span>
                      <span className="ml-2">WARD-{data.Ward.ward}</span>
                      <span className="ml-3">{data.ADDRESS||'Dhapakhel,Gems School'}</span>
                    </div>
                  </div>
                </div>
              </span>
            </div>
          </div>
      </AccordionHeader>
      <AccordionBody>
        {/* <div className="text-bold text-md px-3">Buildings In the Area</div> */}
         <div className="m-2 ">
         <div className="">
          <span className=" text-gray-500 bold  text-green-900">Infrastructre in the Area</span>
          <BarChart data={data2} ></BarChart>
          </div>
          <div> </div>
          </div>
      </AccordionBody>
    </Accordion>
  ));
  return <Fragment>{disaster}</Fragment>;
}
