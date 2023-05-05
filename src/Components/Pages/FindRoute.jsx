import { useEffect, useState } from "react";
import { GeoJSON } from "react-leaflet";
import { Marker, Popup, useMap, Polyline } from "react-leaflet";
import { ToastContainer, toast } from "react-toastify";
import L from "leaflet";
import { useDispatch, useSelector } from "react-redux";
import { GetRoute } from "../../store/Slices/damageLegendSlice";

export default function FindRouteMap() {
  const startLocationfrompanel = useSelector(
    (state) => state.damageLegend.startlocation
  );
  const endLocation = useSelector((state) => state.damageLegend.endlocation);
  const dispatch = useDispatch();
  const geojson = useSelector((state) => state.damageLegend.currentroute);
  function StartMarker() {
    if (startLocationfrompanel) {
      return (
        <Marker
          position={startLocationfrompanel}
          icon={L.divIcon({
            className: "blinking-marker ",
            iconSize: L.point(15, 15, true),
          })}
        >
          <Popup>Start</Popup>
        </Marker>
      );
    }
  }

  function EndMarker() {
    if (endLocation) {
      return (
        <Marker
          position={endLocation}
          icon={L.divIcon({
            className: "blinking-marker",
            iconSize: L.point(15, 15, true),
          })}
        >
          <Popup>End</Popup>
        </Marker>
      );
    }
  }
  const styleGEOJSON = {
    radius: 8,
    fillColor: "red",
    color: "red",
    weight: 7,
    opacity: 1,
    fillOpacity: 0.8,
  };
  const map = useMap();
  useEffect(() => {
    if ((startLocationfrompanel, endLocation)) {
      dispatch(GetRoute([startLocationfrompanel, endLocation]));
      toast.success("Data updated successfully!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 500,
      });
    }
  }, [startLocationfrompanel, endLocation]);
  useEffect(() => {
    if ((geojson, startLocationfrompanel, endLocation)) {
      let newLayer = new L.GeoJSON(geojson, { style: styleGEOJSON });
      newLayer.addTo(map);
      return () => {
        map.removeLayer(newLayer);
      };
    }
  }, [geojson, startLocationfrompanel]);
  return (
    <>
      <ToastContainer />
      <StartMarker />
      <EndMarker />
    </>
  );
}
