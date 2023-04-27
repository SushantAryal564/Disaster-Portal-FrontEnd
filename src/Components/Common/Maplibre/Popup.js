/* eslint-disable */
import React, { useContext, useEffect, useRef, useState } from "react";
// import { mapContext } from '../context/mapContext';
import mapboxgl from "mapbox-gl";

let onclick = () => {};

export const Popup = ({
  map,
  children,
  disablePopup,
  onFeatureClick = () => {},
}) => {
  //   const { map } = useContext(mapContext);
  const popupRef = useRef();

  const [popup, setPopup] = useState(null);

  const removeAllPopup = () => {
    popup?.remove();
  };

  useEffect(() => {
    if (!map) return;
    map.on("closeAllPopups", removeAllPopup);

    map.on("closeAllPopups", removeAllPopup);
    map.on("closeAllPopups", removeAllPopup);

    map.on("closeAllPopups", removeAllPopup);

    return () => {
      map.off("closeAllPopups", removeAllPopup);
    };
  }, [popup, map]);

  useEffect(() => {
    if (!map) return;

    map.off("click", onclick);

    onclick = (e) => {
      const features = map.queryRenderedFeatures(e.point);
      if (features.length > 0) {
        if (
          ["building_vectile", "building_point_vectile"].includes(
            features[0].layer.id
          ) &&
          !disablePopup
        ) {
          if (features[0]?.properties?.facility_type) {
            onFeatureClick(features[0]);
            setPopup(
              new mapboxgl.Popup({})
                .setLngLat(e.lngLat)
                .setDOMContent(popupRef.current)
                .addTo(map)
            );
          }
        }
      }
    };

    map.on("click", onclick);
  }, [map, disablePopup]);

  // useEffect(() => {

  //   popup.on('close', onClose);

  //   return popup.remove;
  // }, [children, lngLat]);

  return (
    <div style={{ display: "none" }} className="mypop">
      {/* <div ref={popupRef}>{children}</div> */}
      <div ref={popupRef}>{children}</div>
    </div>
  );
};

export default Popup;
