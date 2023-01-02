import { Marker, Popup } from "react-leaflet";
import { defaultIcon } from "../icons/defaulticon";
import { Card } from "antd";
const PopuupStatistics = () => {
  return (
    <Card type="inner" title="Inner Card title">
      Inner Card content
    </Card>
  );
};
const MarkerLayer = ({ data }) => {
  return data.features.map((feature) => {
    const { coordinates } = feature.geometry;
    return (
      <Marker
        key={String(coordinates)}
        position={[coordinates[1], coordinates[0]]}
        icon={defaultIcon}
      >
        <Popup>
          <PopuupStatistics />
        </Popup>
      </Marker>
    );
  });
};
export default MarkerLayer;
