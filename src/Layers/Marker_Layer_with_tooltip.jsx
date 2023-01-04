import { Fragment } from "react";
import { Marker, Tooltip, useMap } from "react-leaflet";
import { defaultIcon } from "../icons/defaulticon";
import { mountainIcon } from "../icons/mountainIcon";
const MarkerLayerWithToolTip = ({ data }) => {
  const leafletMap = useMap();
  return data.features.map((feature) => {
    const { coordinates } = feature.geometry;
    const { name, elevation, continent } = feature.properties;
    return (
      <Fragment>
        <Marker
          key={String(coordinates) + 2}
          position={[coordinates[1], coordinates[0]]}
          icon={mountainIcon}
          eventHandlers={{
            click: (e) => leafletMap.panTo(e.latlng),
          }}
        >
          <Tooltip>
            <h3>Mt. {name}</h3>
            continatent: <b>{continent}</b>
            <br />
            Elevation: <b>{elevation}</b>
          </Tooltip>
        </Marker>
      </Fragment>
    );
  });
};
export default MarkerLayerWithToolTip;
