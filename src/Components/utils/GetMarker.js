import L from "leaflet";

export const getMarker = (which) => {
  switch (which) {
    case "hospital":
      return new L.Icon({
        iconUrl: require("../../assests/Marker_hospital.png"),
        iconSize: [40, 40],
        iconAnchor: [17, 46],
        popupAnchor: [0, -46],
      });
    case "school":
      return new L.Icon({
        iconUrl: require("../../assests/school.png"),
        iconSize: [40, 40],
        iconAnchor: [17, 46],
        popupAnchor: [0, -46],
      });
    case "fire_station":
      return new L.Icon({
        iconUrl: require("../../assests/FireStation.png"),
        iconSize: [40, 40],
        iconAnchor: [17, 46],
        popupAnchor: [0, -46],
      });
    case "bank":
      return new L.Icon({
        iconUrl: require("../../assests/Marker_bank.png"),
        iconSize: [40, 40],
        iconAnchor: [17, 46],
        popupAnchor: [0, -46],
      });
    case "university":
      return new L.Icon({
        iconUrl: require("../../assests/Marker_Uni.png"),
        iconSize: [40, 40],
        iconAnchor: [17, 46],
        popupAnchor: [0, -46],
      });
    case "hindu":
      return new L.Icon({
        iconUrl: require("../../assests/Marker-temple.png"),
        iconSize: [40, 40],
        iconAnchor: [17, 46],
        popupAnchor: [0, -46],
      });
    case "college":
      return new L.Icon({
        iconUrl: require("../../assests/Marker_Colle.png"),
        iconSize: [40, 40],
        iconAnchor: [17, 46],
        popupAnchor: [0, -46],
      });
    default:
      return new L.Icon({
        iconUrl: require("../../assests/marker.png"),
        iconSize: [40, 40],
        iconAnchor: [17, 46],
        popupAnchor: [0, -46],
      });
  }
};
