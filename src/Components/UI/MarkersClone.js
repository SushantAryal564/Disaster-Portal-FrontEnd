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
              <div className="bg-teal-500 text-white text-md border-gray-200 border-t-2 pt-3 ">
                <center>
                  <h1>
                    {event.name}
                    {event.title}
                  </h1>
                </center>
                <br />
              </div>

              {event.tags ? (
                <div className="text-gray-700 text-xs mt-3 ">
                  {event.tags[0].name} {event.tags[0].description}
                </div>
              ) : (
                ""
              )}
              <div className="text-gray-700 text-xs mt-3">
                <p className="text-red-500">{event.description}</p>
              </div>
              <div className="text-black-900 text-sm mt-3">
                <span className="text-xs text-gray-400">
                  Datasource- {event.dataSource}
                </span>
              </div>
              <span className="text-xs text-red-400">{event.status}</span>
              <div className=" border-t-2">
                <span className="font-normal pt-1 text-sm  ">
                  {/* <div className="font-semibold text-xs ">{event.status}</div> */}
                  <div className="text-xs text-gray-500  ">
                    {event.waterLevelOn ? (
                      <>
                        <span className="">
                          Water Level : {event.waterLevel}
                        </span>
                        <br />
                        <span className="">
                          Warning Level: {event.warningLevel}
                        </span>
                        <p className="">Updated on :</p>
                        <span className="">{event.waterLevelOn}</span>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </span>
              </div>

              {event.images ? (
                <div className="text-md font-medium   ">
                  <div className="text-red-700 text-sm   border-indigo-300 border-r-2 pr-4">
                    <span className="px-2">
                      <img
                        className="object-cover h-96 w-96"
                        src={event.images[0]}
                      ></img>
                    </span>
                  </div>
                </div>
              ) : (
                ""
              )}
              {event.image ? (
                <div className="text-md font-medium   ">
                  <div className="text-red-700 text-sm   border-indigo-300 border-r-2 pr-4">
                    <span className="px-2">
                      {event.image && (
                        <img
                          className="object-cover h-96 w-96"
                          src={event.image || defaultimage}
                        ></img>
                      )}
                    </span>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
}

export default MarkersClone;
