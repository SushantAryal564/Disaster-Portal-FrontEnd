import L from "leaflet";
import { Marker, Popup } from "react-leaflet";
import { AiFillFire } from "react-icons/ai";
import { BiAlarm } from "react-icons/bi";
export var greenIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
export var redIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
export var blueIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
export var blackIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export var stationIcon = L.icon({
  iconUrl: require("./black.jpg"),
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 25],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [10, 10],
});

function MarkersClone({ disaster: event }) {
  console.log("Markerclone gets", event[0]);
  const getIcon = (type) => {
    switch (event.type) {
      case "Flood":
        return blueIcon;
      case "Fire":
        return redIcon;
      case "LandSlide":
        return blackIcon;
      case "Other":
        return greenIcon;
      default:
        return greenIcon;
    }
  };
  return (
    <>
      {event.map((event) => (
        <Marker
          key={`disaster-${event.id}`}
          position={[event.point.coordinates[1], event.point.coordinates[0]]}
          icon={stationIcon}
        >
          <Popup>
            <div class="">
              <div class="bg-indigo-700 text-white text-md border-gray-200 border-t-2 pt-3 ">
                <center>
                  <h1>
                    {event.name}
                    {event.title}
                  </h1>
                </center>
                <br />
              </div>

              {event.tags ? (
                <div class="text-gray-700 text-xs mt-3">
                   {event.tags[0].name}   {event.tags[0].description}
                </div>
              ) : (
                ""
              )}
              <div class="text-gray-700 text-xs mt-3">
                <p className="text-red-500">{event.description}</p>
              </div>
              <div class="text-black-900 text-sm mt-3">
                <span className="text-xs text-gray-400">
                  Data source-{event.dataSource}
                </span>
              </div>
              <span className="font-normal ml-5 pt-1 text-sm border-t-2 ">
                  <div className="font-semibold ">{event.status}</div>
                  <div>
                    <div className="text-xs text-gray-500  ">
                      <div className="flex items-center px-2">
                        <span className="pl-1">{event.waterLevelOn}</span>
                      </div>
                    </div>
                  </div>
                </span>
              <div className="text-md font-medium   ">
                <div className="text-red-700 text-sm   border-indigo-300 border-r-2 pr-4">
                  <span className="px-2">
                    {event.images ? <img src={event.images[0]}></img> : ""}
                    
                  </span>
                </div>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
}

export default MarkersClone;
