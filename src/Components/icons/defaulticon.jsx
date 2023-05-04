import L from "leaflet";
import iconUrl from "./../assests/images/marker-icon.png";
import iconShadow from "./../assests/images/marker-shadow.png";
const { iconSize, shadowSize, iconAnchor, popupAnchor, tooltipAnchor } =
  L.Marker.prototype.options.icon.options;

export const defaultIcon = L.icon({
  iconUrl,
  iconShadow,
  iconSize,
  shadowSize,
  iconAnchor,
  popupAnchor,
  tooltipAnchor,
});


