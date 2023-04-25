import React, { useState } from "react";

const { Children, cloneElement, useEffect } = React;

function MapContainer({
  children,
  mapObj,
  maploaded,
  mapRef,
  style = {},
  onZoomChange = () => {},
}) {
  useEffect(() => {
    setMap(mapObj);
    mapObj?.on("zoom", (e) => {
      onZoomChange(mapObj.getZoom());
    });
  }, [mapObj]);

  const childrenCount = Children.count(children);

  const [map, setMap] = useState(null);
  return (
    <div id="main-map" style={{ ...style }} ref={mapRef}>
      {childrenCount < 1 ? (
        <></>
      ) : childrenCount > 1 ? (
        Children.map(children, (child) =>
          child ? cloneElement(child, { map, maploaded }) : <></>
        )
      ) : (
        cloneElement(children, { map, maploaded })
      )}
    </div>
  );
}

export default MapContainer;
