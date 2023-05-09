import L from "leaflet";
import { Marker, Popup } from "react-leaflet";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WatchLaterIcon from "@mui/icons-material/WatchLater";

// export const getIcon = (disastertype) => {
//   if (disastertype == "Fire") {
//     return new L.DivIcon({
//       className: "marker-fire",
//     });
//   }
//   if (disastertype == "Flood") {
//     return new L.DivIcon({
//       className: "marker-flood",
//     });
//   }
//   return new L.DivIcon({
//     className: "marker-fire",
//   });
// };
export const getIcon = (icon, verified) => {
  return L.divIcon({
    className: "marker-fire-two",
    iconSize: [10, 10],
    html: `<div
    style="
    border-radius: 50%;
    background-color: ${verified ? "#fafd34" : "#ffb938"};
    padding: 3px;
    transform: translate(-35%,-40%);
    width: 15px; height: 15px; display: flex; justify-content: center; align-items: center;"><img src=${icon} style="max-width: 80%; max-height: 80%;"></div>`,
  });
};

function Markers({ disaster: event, setOpen }) {
  const [dateString, timeString] = event.startTime.split("T");
  return (
    <Marker
      key={`disaster-${event.id}`}
      position={[event.lat || 83, event.long || 23]}
      icon={getIcon(event?.type?.icon, event?.is_verified)}
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
