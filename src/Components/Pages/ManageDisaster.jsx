import React from "react";
import Layout from "../Layout/Layout";
import { LayersControl, MapContainer, Marker, TileLayer } from "react-leaflet";
import { useSelector } from "react-redux";
import { GetManageDisasterWardShpGETThunk } from "../../store/Slices/manageDisasterSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GeoJSON } from "react-leaflet";

const ManageDisaster = (props) => {
  const dispatch = useDispatch();
  const wardId = useSelector((state) => {
    return state.auth.wardId;
  });
  const wardShp = useSelector((state) => {
    return state.manageDisaster.data[0];
  });
  useEffect(() => {
    dispatch(GetManageDisasterWardShpGETThunk(wardId));
  }, [dispatch, wardId]);
  const scrollWheelZoom = true;
  const position = [27.67571580617923, 85.3183283194577];

  return (
    <Layout>
      <div className="grid grid-cols-4">
        <div className="col-span-2 ">06</div>
        <div className="col-span-2 ">
          <MapContainer
            center={position}
            zoom={14}
            scrollWheelZoom={scrollWheelZoom}
            className="mt-1 z-10"
          >
            <LayersControl position="topright">
              <LayersControl.BaseLayer name="OSM Streets">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              </LayersControl.BaseLayer>
              <LayersControl.BaseLayer name="World Imagery">
                <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
              </LayersControl.BaseLayer>
              <LayersControl.BaseLayer checked name="Grey Imagery">
                <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png" />
              </LayersControl.BaseLayer>
            </LayersControl>

            {wardShp ? <GeoJSON data={wardShp}></GeoJSON> : ""}
          </MapContainer>
        </div>
      </div>
    </Layout>
  );
};
export default ManageDisaster;
