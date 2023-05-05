import L from "leaflet";
import { Marker, Popup } from "react-leaflet";
import { AiFillFire } from "react-icons/ai";
import { BiAlarm } from "react-icons/bi";
import defaultimage from "./black.jpg";
import { useSelector } from "react-redux";

function MarkersClone({ disaster: event }) {
  const selecteddata = useSelector((state) => state.selected.selectedMarkerId);
  return (
    <>
      {event.map((event) => (
        <Marker
          key={`disaster-${event.id}`}
          position={[event.point.coordinates[1], event.point.coordinates[0]]}
          icon={
            new L.DivIcon({
              className:
                selecteddata == event.id
                  ? "blinking-marker-selected"
                  : "blinking-marker",
            })
          }
        >
          <Popup maxWidth={400}>
            <div className=" pop-width w-96 p-2">
              <div className="text-lg font-bold">{event.name}</div>
              {event.tags && (
                <div className="text-gray-700 text-s mt-1">
                  {event.tags[0].name} {event.tags[0].description}
                </div>
              )}
              <div className="text-s mt-1">{event.description}</div>
              <span
                className={`text-xs font-bold ${
                  event.status === "BELOW WARNING LEVEL"
                    ? "text-green-500"
                    : "text-red-500"
                } `}
              >
                {event.status}
              </span>
              <span className="font-normal pt-1 text-sm  ">
                <div className="text-xs ">
                  <div className="mt-2 text-sm">Detail: </div>
                  {event.waterLevelOn && (
                    <div className="flex flex-col gap-1">
                      <div className="">Water Level : {event.waterLevel}</div>
                      <div className="">
                        Warning Level: {event.warningLevel}
                      </div>
                      <div className="flex gap-2">
                        <div>Updated on:</div>
                        <div>{new Date(event.waterLevelOn).toDateString()}</div>
                        <div>{new Date(event.waterLevelOn).toTimeString()}</div>
                      </div>
                    </div>
                  )}
                </div>
              </span>
              <div className="text-black-900 text-sm">
                <span className="text-xs">Datasource- {event.dataSource}</span>
              </div>
              {event.images ? (
                <div className="text-md font-medium   ">
                  <img className="object-cover" src={event.images[0]}></img>
                </div>
              ) : (
                ""
              )}
              {event.image && (
                <div className="text-md font-medium mt-1">
                  {event.image && <img src={event.image}></img>}
                </div>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
}

export default MarkersClone;
