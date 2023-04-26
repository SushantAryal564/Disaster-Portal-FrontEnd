import React, { useRef } from "react";
import { useEffect } from "react";
import { Pane, WMSTileLayer } from "react-leaflet";

export const Wms = ({ url, layers, styles }) => {
  const wmsLayerRef = useRef(null);
  useEffect(() => {
    const wmsLayer = wmsLayerRef.current?.leafletElement;
    if (wmsLayer) {
      wmsLayer.setZIndex(-100);
    }
  }, [wmsLayerRef]);
  return (
    <>
      <Pane name="myPane">
        <WMSTileLayer
          ref={wmsLayerRef}
          url={url}
          params={{
            layers: layers,
            format: "image/png",
            transparent: true,
            version: "1.1.0",
            styles: styles,
            noWrap: true,
          }}
        ></WMSTileLayer>
      </Pane>
    </>
  );
};
