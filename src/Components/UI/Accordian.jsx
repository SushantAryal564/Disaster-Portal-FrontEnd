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

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  console.log(AllDisaster);
  const disaster = AllDisaster.map((disaster) => (
    <Accordion
      open={open === disaster.id}
      icon={<Icon id={disaster.id} open={open} />}
    >
      <AccordionHeader
        onClick={() => {
          handleOpen(disaster.id);
          dispatch(removeAll());
          latlngHandler([disaster.lat, disaster.long]);
        }}
        className="text-sm py-0 px-2 py-2"
      >
        <div className="flex flex-col	">
          <div>
            <img src={disaster?.type?.icon} className="h-5 inline pr-2" />
            {disaster.name}
          </div>
          <div className="px-0 flex justify-center text-xs gap-2">
            <BiAlarm size={18} className="inline" />
            {disaster.startTime}
          </div>
        </div>
      </AccordionHeader>
      <AccordionBody>CHART AND STATS HERE</AccordionBody>
    </Accordion>
  ));
  return <Fragment>{disaster}</Fragment>;
}
