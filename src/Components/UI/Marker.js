import L from "leaflet";
import { Marker, Popup } from "react-leaflet";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
var flood = L.icon({
  iconUrl: "http://127.0.0.1:8000/images/flood.svg",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

//return DIV ICON CASE FOR DIFFERENT DISASTER
export const getIcon = (disastertype) => {
  if (disastertype == "Fire") {
    return new L.DivIcon({
      className: "marker-fire",
    });
  }
  if (disastertype == "Flood") {
    return new L.DivIcon({
      className: "marker-flood",
    });
  }
  return new L.DivIcon({
    className: "marker-fire",
  });
};

function Markers({ disaster: event, setOpen }) {
  const [dateString, timeString] = event.startTime.split("T");
  return (
    <Marker
      key={`disaster-${event.id}`}
      position={[event.lat || 83, event.long || 23]}
      icon={getIcon(event?.type?.title)}
      eventHandlers={{
        click: () => {
          setOpen(event.id);
        },
      }}
    >
      <Popup>
        <div className="text-lg mb-2 border-gray-200 border-b-2">
          {event.name}
        </div>
        <div>
          <div className="font-semibold mb-1">
            Address: <span className="font-normal">{event.address}</span>{" "}
          </div>
          <div className="flex gap-2 items-center">
            <div className="flex gap-1 items-center">
              <CalendarMonthIcon
                className="text-red-600"
                style={{ width: "18px", height: "17px" }}
              />
              <div>{dateString}</div>
            </div>
            <div className="flex items-center">
              <WatchLaterIcon
                className="text-red-600"
                style={{ width: "18px", height: "17px" }}
              />
              <div>{timeString}</div>
            </div>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default Markers;
