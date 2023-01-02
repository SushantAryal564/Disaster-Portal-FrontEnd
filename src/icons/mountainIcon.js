import L from "leaflet";
import mountainpng from "./../assests/images/mountain.png";

// const mountainIcon = new L.Icon({
//   iconUrl: require("./../assests/images/mountain.png"),
//   iconRetinaUrl: require("./../assests/images/mountain.png"),
//   iconAnchor: [17, 16],
//   popupAnchor: null,
//   shadowUrl: null,
//   shadowSize: null,
//   shadowAnchor: null,
//   iconSize: new L.Point(23, 35),
//   className: "leaflet-div-icon",
// });

// export { mountainIcon };

const LeafIcon = L.Icon.extend({
  options: {
    iconSize: [35, 23],
  },
});
export const mountainIcon = new LeafIcon({ iconUrl: mountainpng });
