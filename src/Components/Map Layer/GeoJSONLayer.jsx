import { GeoJSON, LayersControl } from "react-leaflet";
export const GeoJSONLayer = ({ data, name }) => {
  const layer = <GeoJSON key="geo-json-layer" data={data}></GeoJSON>;
  return <LayersControl.Overlay name={name}>{layer}</LayersControl.Overlay>;
};
