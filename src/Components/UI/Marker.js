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

function Markers({ disaster: event }) {
  console.log(event);
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
    <Marker
      key={`disaster-${event.id}`}
      position={[event.lat || 23, event.long || 83]}
      icon={getIcon(event.name)}
    >
      <Popup>
        <div class="">
          <div class="bg-indigo-700 text-white text-md border-gray-200 border-t-2 pt-3 ">
            <center>
              <h1>{event.name}</h1>
            </center>
            <br />
          </div>

          <div class="text-black-900 text-sm mt-3">
            Fire in the forest of Godawari
          </div>
          <div className="border-gray-200 border-b-2 p-3 hover:bg-gray-200 py-4">
            <div className="text-md font-medium flex flex-row  ">
              <div className="text-red-700 text-sm flex flex-col  border-indigo-300 border-r-2 pr-4">
                <span className="px-2">
                  {" "}
                  <AiFillFire size={30} />
                </span>
                <p className="text-xs pl-3">Fire</p>
              </div>
              <span className="font-normal ml-5 pt-1 text-sm">
                <div className="font-semibold "> Kyonjan Municipality</div>
                <div>
                  <div className="text-xs  text-gray-500 flex justify-start ">
                    <span className="">2023/1/23</span>
                    <div className="flex items-center px-2">
                      <span>
                        <BiAlarm />
                      </span>
                      <span className="pl-1">4:55</span>
                    </div>
                  </div>
                </div>
              </span>
            </div>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default Markers;
