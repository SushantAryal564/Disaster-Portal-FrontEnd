import React, { useEffect, useState, Fragment } from "react";
import { GeoJSON, CircleMarker } from "react-leaflet";
import Layout from "../Layout/Layout";
import {
  LayersControl,
  MapContainer,
  Marker,
  TileLayer,
  WMSTileLayer,
} from "react-leaflet";
import { GeoJSONLayer } from "../Map Layer/GeoJSONLayer";
import { SideBar } from "../Layout/SidebarNav";
import ResetViewControl from "@20tab/react-leaflet-resetview";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useDispatch, useSelector } from "react-redux";
import { slidebarAction } from "../../store/Slices/uiSlice";
import Markers from "../UI/Marker";
import MarkersClone from "../UI/MarkersClone";
import Dashboard from "../../Sidebar/dashboard";
import Incident from "../../Sidebar/incident";
import DamageLoss from "../../Sidebar/damageLoss";
import RiskInfo from "../../Sidebar/riskinfo";
import { LiveData } from "../../Sidebar/realtime";
import ReportAnAncident from "../../Sidebar/reportIncident";
import DataArchieve from "../../Sidebar/dataArchive";
import Situation from "../../Sidebar/situation";
import Feedback from "@mui/icons-material/Feedback";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import {
  DamageAndLossLegend,
  IncidentLegend,
  NavigationLegend,
  RiskInfoLegend,
} from "../Legends/Legend";
import {
  DASHBOARD,
  INCIDENT,
  DAMAGELOSS,
  RISKINFO,
  REALTIME,
  REPORT,
  DATA,
  SITUATION,
  FEEDBACK,
  ROUTE,
} from "./../../store/constant";
import { ScaleControl } from "react-leaflet";
import { DashboardLegend, RealTimeLegend } from "../Legends/Legend";
import { Wms } from "../../RiskInfo/Wms";
import { WmsCriti } from "../Map Layer/WmsCriticalInfras";
import { WmsAmenities } from "../Map Layer/AmenitiesWms";
import CommonMarker from "../Common/Marker/CommonMarker";
import { InfrastructureAsyncGETThunk } from "../../store/Slices/riskinfoSlice";
import DownloadWardGeoJSONRender from "./DownloadWardgeojson";
import getColor from "../Common/Choropleth";
import FindRouteMap from "./FindRoute";
import FindRoute from "../../Sidebar/Route";
import RouteMarker from "../Common/Marker/RouteMarker";
// import FractionalZoom from "./Fractionalzoom";

export const Portal = () => {
  const dedata = useSelector((state) => state.selected.dateselectedevent);
  const selectedPanel = useSelector((state) => {
    return state.riskinfo.currentpanel;
  });
  const amenitiesToggle = useSelector((state) => {
    return state.riskinfo.amenitiesToggle;
  });
  const [reportActivated, setReportActivated] = useState(false);
  const dispatch = useDispatch();
  var [jsonLalitpurMetro, setJsonLalitpurMetro] = useState("");
  var [jsonWard, setJsonWard] = useState("");
  const currentdamageindex = useSelector((state) => state.chart.tab);
  const totalIncident = useSelector((state) => {
    return state.damageloss.totalIncident;
  });
  const totalEstimatedLoss = useSelector((state) => {
    return state.damageloss.totalEstimatedLoss;
  });
  const totalPeopleDeath = useSelector((state) => {
    return state.damageloss.totalPeopledeath;
  });
  const totalInfrastructureDamage = useSelector((state) => {
    return state.damageloss.totalInfrastructure;
  });
  const slidebarState = useSelector((state) => {
    return state.slidebar.slidebarState;
  });
  const component = useSelector((state) => {
    return state.component;
  });
  const changeReportState = () => {
    setReportActivated(!reportActivated);
  };
  const changeComponent = (compName) => {
    switch (compName) {
      case DASHBOARD:
        return <Dashboard reportActivated={reportActivated} />;
      case INCIDENT:
        return <Incident reportActivated={reportActivated} />;
      case DAMAGELOSS:
        return <DamageLoss reportActivated={reportActivated} />;
      case RISKINFO:
        return <RiskInfo />;
      case REALTIME:
        return <LiveData />;
      case REPORT:
        return <ReportAnAncident />;
      case DATA:
        return <DataArchieve reportActivated={reportActivated} />;
      case SITUATION:
        return <Situation reportActivated={reportActivated} />;
      case FEEDBACK:
        return <Feedback />;
      case ROUTE:
        return <FindRoute reportActivated={reportActivated} />;
      default:
        return <Dashboard />;
    }
  };
  const ComponentToRender = changeComponent(component);
  const metroJSON = async () => {
    let data = await fetch(
      "http://127.0.0.1:8000/api/v1/spatial/lalitpurMetro/"
    );
    let datajson = await data.json();
    setJsonLalitpurMetro(datajson);
  };
  const wardJSON = async () => {
    let data = await fetch("http://127.0.0.1:8000/api/v1/spatial/ward/");
    let datajson = await data.json();
    setJsonWard(datajson);
  };
  const changeSlidebarState = () => {
    dispatch(slidebarAction.changeSlidebarState());
  };
  const infrastructure = useSelector((state) => state.riskinfo.data);
  const selectedRouteInfrastructure = useSelector(
    (state) => state.damageLegend.selectedInfrastructure
  );
  const routeInfrastructure = useSelector((state) => state.damageLegend.data);
  const downloablebuildingarchive = useSelector(
    (state) => state.selected.selectionDownloadWardbuilding
  );

  const datadisaster = useSelector((state) => state.disaster.data);
  const realtimedatawater = useSelector((state) => state.live.water);
  const realtimepollution = useSelector((state) => state.live.pollution);
  const dataIncident = useSelector((state) => state.disasterIncident.data);
  useEffect(() => {
    dispatch(InfrastructureAsyncGETThunk("school"));
    metroJSON();
    wardJSON();
  }, []);
  const position = [27.65707, 85.3133];
  let disasterinDashboard = [
    ...new Set(
      datadisaster.map((data) => {
        return {
          is_verified: data?.is_verified,
          url: data?.type?.icon,
          title: data?.type?.title,
        };
      })
    ),
  ];
  const DashboardLegendItem = disasterinDashboard.filter(
    (obj, index, self) =>
      index ===
      self.findIndex(
        (o) =>
          o.url === obj.url &&
          o.is_verified === obj.is_verified &&
          o.title === obj.title
      )
  );
  let disasterinIncident = [
    ...new Set(
      dataIncident.map((data) => {
        return {
          is_verified: data?.is_verified,
          url: data?.type?.icon,
          title: data?.type?.title,
        };
      })
    ),
  ];
  const IncidentLegendItem = disasterinIncident.filter(
    (obj, index, self) =>
      index ===
      self.findIndex(
        (o) =>
          o.url === obj.url &&
          o.is_verified === obj.is_verified &&
          o.title === obj.title
      )
  );
  const scrollWheelZoom = true;
  const disasterClass = useSelector(
    (state) => state.damageloss.disasterClasses
  );
  const lossClass = useSelector((state) => state.damageloss.LossClass);
  const peopleDeathClass = useSelector(
    (state) => state.damageloss.PeopleDeathClass
  );
  const infrastructureClass = useSelector(
    (state) => state.damageloss.InfrastructureClass
  );

  const styleFeature = (feature) => {
    let currentLegendItem = currentdamageindex;
    let data = 0;
    if (currentLegendItem === "INCIDENT") {
      data = feature.properties.number_of_disasters;
      return {
        fillColor: getColor(data, disasterClass),
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.7,
      };
    } else if (currentLegendItem === "LIVES_LOST") {
      data = feature.properties.total_people_death;
      return {
        fillColor: getColor(data, peopleDeathClass),
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.7,
      };
    } else if (currentLegendItem === "PROPERTY_LOSS") {
      data = feature.properties.total_estimated_loss;
      return {
        fillColor: getColor(data, lossClass),
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.7,
      };
    } else if (currentLegendItem === "INFRASTRUCTURE_DAMAGE") {
      data = feature.properties.total_infrastructure_damaged;
      return {
        fillColor: getColor(data, infrastructureClass),
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.7,
      };
    } else {
      data = feature.properties.number_of_disasters;
      return {
        fillColor: getColor(data, currentdamageindex),
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.7,
      };
    }
  };

  const createClusterCustomIcon = function (cluster) {
    return L.divIcon({
      html: `<span>${cluster.getChildCount()}</span>`,
      className: "marker-cluster-custom",
      iconSize: L.point(35, 35, true),
    });
  };
  const wardstyle2 = {
    fillColor: `green`,
    opacity: 1,
    weight: 1,
    color: "green",
    fillOpacity: 0.7,
  };

  return (
    <Fragment>
      {reportActivated ? (
        <div className="absolute  w-[100%] h-[100%] z-[25] backdrop-brightness-[0.6] "></div>
      ) : null}
      <div className="flex">
        <div
          className={`${
            slidebarState ? "w-2/5 " : "w-0"
          } duration-300 h-[100vh] relative`}
        >
          {ComponentToRender}
        </div>
        <NavigateNextIcon
          style={{
            maxWidth: "30px",
            maxHeight: "50px",
            minWidth: "30px",
            minHeight: "50px",
          }}
          className={`
          bg-white absolute cursor-pointer  top-1/2 w-7 border-2 z-20  ${
            slidebarState
              ? "rotate-180 rounded-l-lg left-[27.4%]"
              : "rounded-r-lg left-[0%]"
          }`}
          onClick={changeSlidebarState}
        />
        <MapContainer
          className="markercluster-map z-10 mr-[4rem]"
          center={position}
          zoom={13}
          scrollWheelZoom={scrollWheelZoom}
          maxZoom={20}
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

            <LayersControl.BaseLayer name="WMS">
              {/* <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png" /> */}
            </LayersControl.BaseLayer>

            {component == RISKINFO && selectedPanel === 1 ? (
              <Wms
                url="http://localhost:8080/geoserver/Lalitpur/wfs"
                layers="Lalitpur:PopulationLalitpurMetro_final"
                styles="wardsld"
              />
            ) : (
              ""
            )}
            {component == RISKINFO && selectedPanel === 2 ? (
              <Wms
                url="http://localhost:8080/geoserver/Lalitpur/wfs"
                layers="Lalitpur:LalitpurLULC"
                styles="LULC"
              />
            ) : (
              ""
            )}

            {jsonLalitpurMetro ? (
              <GeoJSONLayer
                data={jsonLalitpurMetro}
                name="Lalitpur Metropolitian City"
              />
            ) : (
              ""
            )}
            {jsonWard ? (
              <GeoJSONLayer
                data={jsonWard}
                checked
                name="Lalitpur Metropolitian Ward"
              />
            ) : (
              ""
            )}
          </LayersControl>

          <ResetViewControl title="Reset view" position="topright" />
          {jsonWard ? (
            <GeoJSON
              data={jsonWard}
              style={{
                fillColor: "white",
                weight: 1,
                opacity: 0.8,
                color: "blue",
                dashArray: "4",
                fillOpacity: 0.1,
              }}
              onEachFeature={(feature, layer) => {
                layer
                  .bindTooltip("W" + feature.properties.ward, {
                    permanent: true,
                    direction: "left",
                    className: "ward-label",
                  })
                  .openTooltip();
              }}
            />
          ) : (
            ""
          )}
          <ScaleControl metric={true} position="bottomleft" />
          {component === DAMAGELOSS && (
            <GeoJSON data={jsonWard} style={styleFeature} />
          )}

          {component === DASHBOARD
            ? datadisaster.map((event) => {
                return <Markers disaster={event} key={event.id} />;
              })
            : ""}
          <MarkerClusterGroup
            showCoverageOnHover={false}
            spiderfyDistanceMultiplier={2}
            iconCreateFunction={createClusterCustomIcon}
          >
            {component === INCIDENT
              ? dataIncident.map((event) => {
                  return <Markers disaster={event} key={event.id} />;
                })
              : ""}
          </MarkerClusterGroup>

          {component === "Data" && dedata
            ? dedata?.map((event) => {
                return <Markers disaster={event} key={event.id} />;
              })
            : ""}

          {component === "Data" && dedata
            ? dedata?.map((event) => {
                return (
                  <CircleMarker
                    center={[event.lat, event.long]}
                    radius={20}
                    weight={1}
                    zIndexOffset={100}
                    className="blinking-circle2"
                  />
                );
              })
            : ""}

          {component == RISKINFO && selectedPanel == 1 && amenitiesToggle ? (
            <WmsAmenities />
          ) : (
            ""
          )}

          {component === REALTIME
            ? realtimedatawater.map((event) => {
                return <MarkersClone disaster={event.results} key={event.id} />;
              })
            : ""}
          {component === REALTIME
            ? realtimepollution.map((event) => {
                return <MarkersClone disaster={event.results} key={event.id} />;
              })
            : ""}
          {component === ROUTE ? <FindRouteMap /> : ""}
          {component === REALTIME && <RealTimeLegend />}
          {component === RISKINFO && <RiskInfoLegend />}
          {component === INCIDENT && (
            <DashboardLegend legendItem={IncidentLegendItem} />
          )}
          {component === DASHBOARD && (
            <DashboardLegend legendItem={DashboardLegendItem} />
          )}
          {component === DAMAGELOSS && <DamageAndLossLegend />}
          {component == RISKINFO && selectedPanel === 3 ? (
            <CommonMarker data={infrastructure} />
          ) : (
            ""
          )}

          {downloablebuildingarchive && component == "Data" ? (
            <DownloadWardGeoJSONRender data={downloablebuildingarchive} />
          ) : (
            ""
          )}
        </MapContainer>
        <SideBar changeReportState={changeReportState} />
        {reportActivated ? (
          <ReportAnAncident
            setReportActivated={setReportActivated}
            reportActivated={reportActivated}
          />
        ) : (
          ""
        )}
      </div>
    </Fragment>
  );
};
export default Portal;
