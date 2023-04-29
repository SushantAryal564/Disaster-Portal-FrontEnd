import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CloseIcon from "@mui/icons-material/Close";
import Select, { StylesConfig } from "react-select";
import L from "leaflet";
import { useMap } from "react-leaflet";
import { GeoJSON } from "react-leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function Edit({ data }) {
  const [statedata, setstatedata] = useState(data);

  let {
    lat,
    long,
    description,
    address,
    name,
    id,
    registered_date,
    type,
    date_event,
  } = data;
  console.log(
    data,
    "THIS IS DATAS-----------------------------",
    lat,
    long,
    description,
    address
  );
  const [position, setPosition] = useState([lat, long]);
  const [calculatedWard, setcalculatedWard] = useState(data.Ward);
  const [disaster, setDisaster] = useState([]);
  const [Region, SetRegion] = useState();
  const disasterTypeGET = async () => {
    const data = await fetch(
      "http://127.0.0.1:8000/api/v1/disaster/disasterType/"
    );
    let disaster = await data.json();
    setDisaster(disaster);
  };

  const getWard = async () => {
    const data = await fetch(
      `http://127.0.0.1:8000/api/v1/spatial/getward/?lat=${position[0]}&lng=${position[1]}`
    );

    let ward = await data.json();
    setcalculatedWard(ward);
  };

  useEffect(() => {
    getWard();
  }, [position]);

  const RegionNameGET = async () => {
    const data = await fetch("http://127.0.0.1:8000/api/v1/spatial/ward/");
    let region = await data.json();
    SetRegion(region.features);
  };
  useEffect(() => {
    RegionNameGET();
    disasterTypeGET();
  }, []);
  const disasterTypeOptions = disaster.map((disaster) => {
    return { value: disaster.title, label: disaster.title };
  });
  function updatePosition(event) {
    setPosition([event.target.getLatLng().lat, event.target.getLatLng().lng]);
  }
  const ReportSendToBackend = async (values) => {
    console.log("valuess,---------------------------", values);
    const response = await fetch(
      "http://127.0.0.1:8000/api/v1/disaster/reportanincident/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );
    // const responseData = await response.json();
    // return responseData;
  };

  const date = new Date(date_event).toISOString().replace("Z", "");

  // console.log(formattedDate);
  //  formattedDate=new Date(formattedDate)
  console.log(date, "FOORmATETED DATE");
  const formik = useFormik({
    initialValues: {
      title: name,
      description: description || null,
      hazard: type?.title | "np title api",
      incidentOn: date,
      streetAddress: address || "no address api",
      image: null,
      region: "",
      latitude: lat || null,
      longitude: long || null,
    },
    validationSchema: Yup.object({
      incidentOn: Yup.date()
        .max(new Date(), "Incident datetime must be before current time")
        .required("Date and Time is required"),
      streetAddress: Yup.string().required("Street Adress is required"),
      hazard: Yup.string().required("Required"),
      region: Yup.string().required("Required"),
      latitude: Yup.number().required("Required"),
      longitude: Yup.number().required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values, "values");
      const disasterobject = disaster.find(
        (disaster) => disaster.title === values.hazard
      );
      const hazardid = disasterobject.id;
      const wardobject = Region.find(
        (ward) => ward.properties.ward == values.region
      );
      const wardid = wardobject.id;
      const disasterData = {
        description: values.title,
        lat: values.latitude,
        long: values.longitude,
        hazard: hazardid,
        Ward: wardid,
        startTime: values.incidentOn + ":00Z",
        name: values.hazard + " in " + values.streetAddress,
      };
      ReportSendToBackend(disasterData);
      //   setReportActivated(false);
    },
  });
  let formIsValid = true;
  if (
    formik.errors.title &&
    formik.errors.hazard &&
    formik.errors.incidentOn &&
    formik.errors.streetAddress &&
    formik.errors.region &&
    formik.errors.latitude &&
    formik.errors.longitude
  ) {
    formIsValid = false;
  } else {
    formIsValid = true;
  }
  console.log(formIsValid);
  const colourStyles = {
    control: (styles, state) => ({
      ...styles,
      backgroundColor: "white",
      border: state.isFocused
        ? "1px solid rgb(239,68,68)"
        : "1px solid #cccccc",
      boxShadow: state.isFocused ? "0px 0px 1px rgb(239,68,68)" : "none",
      "&:hover": {
        border: "1px solid rgb(239,68,68)",
        boxShadow: "0px 0px 1px rgb(239,68,68)",
      },
    }),
  };
  const markerIcon = new L.Icon({
    iconUrl: require("../../assests/marker.png"),
    iconSize: [40, 40],
    iconAnchor: [17, 46],
    popupAnchor: [0, -46],
  });
  function CustomZoomControl() {
    const map = useMap();
    const zoomControl = L.control.zoom({ position: "bottomright" });
    React.useEffect(() => {
      zoomControl.addTo(map);
      return () => map.removeControl(zoomControl);
    }, []);
    return null;
  }
  return (
    <div className="pt-2 px-8 border rounded shadow-2xl scrollbar scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-w-1 scrollbar-rounded-rounded-md  ">
      <div className=" text-gray-500">
        <form onSubmit={formik.handleSubmit}>
          <label
            htmlFor="hazard"
            className="text-xs font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-red-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight font-bold"
          >
            Description
          </label>
          <div className="pt-2">
            <div class="">
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                id="title"
                name="title"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
              />
            </div>
            {formik.errors.title && formik.touched.title ? (
              <div className="text-red-600 text-xs">{formik.errors.title}</div>
            ) : null}
          </div>
          <div className="pt-3 flex gap-10 ">
            <div className="w-full hover:text-red-500 z-[10000]">
              <label
                htmlFor="hazard"
                className="text-xs font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-red-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight font-bold"
              >
                HAZARD
              </label>
              <Select
                className="input hover:text-black"
                styles={colourStyles}
                onChange={(value) => {
                  return formik.setFieldValue("hazard", value.value);
                }}
                id="hazard"
                name="hazard"
                value={formik.values.hazard}
                options={disasterTypeOptions}
              />
              {formik.errors.hazard ? (
                <div className="text-red-600 text-xs">
                  {formik.errors.hazard}
                </div>
              ) : null}
            </div>
            <div className="hover:text-red-500">
              <label
                htmlFor="incidentOn"
                className="text-xs font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-red-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight font-bold"
              >
                INCIDENT ON
              </label>
              <input
                className=" peer h-8 w-full border-b border-blue-gray-200 bg-transparent  font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all focus:border-red-500 focus:outline-0 disabled:border-8 disabled:bg-blue-gray-50 hover:text-black "
                id="incidentOn"
                name="incidentOn"
                type="datetime-local"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.incidentOn}
              />
              {formik.errors.incidentOn && formik.touched.incidentOn ? (
                <div className="text-red-600 text-xs">
                  {formik.errors.incidentOn}
                </div>
              ) : null}
            </div>
          </div>
          <div className="mt-3">
            <div class="relative h-11 w-full min-w-[200px]">
              <input
                className="peer h-8 w-full border-b border-blue-gray-200 bg-transparent  font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all focus:border-red-500 focus:outline-0 disabled:border-8 disabled:bg-blue-gray-50"
                id="streetAddress"
                name="streetAddress"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.streetAddress}
              />
              <label class="after:content[' '] pointer-events-none absolute left-0 -top-3 flex h-full w-full select-none text-xs font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-0 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-red-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-xs peer-focus:leading-tight peer-focus:text-red-500 peer-focus:after:scale-x-100 peer-focus:after:border-red-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 font-bold">
                STREET ADDRESS
              </label>
            </div>
            {formik.errors.streetAddress && formik.touched.streetAddress ? (
              <div className="text-red-600 text-xs">
                {formik.errors.streetAddress}
              </div>
            ) : null}
          </div>
          <div className=" mt-3">
            <label>
              <input
                type="file"
                name="image"
                id="image"
                onChange={(event) => {
                  formik.setFieldValue("image", event.currentTarget.files[0]);
                }}
                class="text-sm text-grey-500
                file:mr-5 file:py-2 file:px-6
                file:rounded-full file:border-0
                file:text-sm file:font-medium
                file:bg-red-50 file:text-red-500
                hover:file:cursor-pointer hover:file:bg-red-100
                hover:file:text-red-700
              "
              />
            </label>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="pt-3 hover:text-red-500 z-[1000]">
              <label
                htmlFor="region"
                className="text-xs font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-red-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight font-bold "
              >
                WARD
              </label>
              <input
                id="region"
                name="region"
                className="h-9 border rounded border-stone-300 w-40 hover:border-red-500 hover:text-black px-2	 "
                styles={colourStyles}
                value={
                  (formik.values.region = calculatedWard?.ward
                    ? calculatedWard.ward
                    : "Error")
                }
              ></input>
              {calculatedWard?.message ? (
                <div className="text-red-600 text-xs">
                  {calculatedWard?.message}
                </div>
              ) : null}
            </div>
            <div className="pt-3 hover:text-red-500">
              <label
                htmlFor="longitude"
                className="text-xs font-normal leading-tight text-blue-gray-500 transition-all font-bold"
              >
                LONGITUDE
              </label>
              <input
                id="longitude"
                name="longitude"
                type="number"
                className="h-9 border rounded border-stone-300 w-40 hover:border-red-500 hover:text-black px-2		"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={(formik.values.longitude = position[1].toFixed(5))}
              ></input>
              {formik.errors.longitude && formik.touched.longitude ? (
                <div className="text-red-600 text-xs">
                  {formik.errors.longitude}
                </div>
              ) : null}
            </div>
            <div className="pt-3 hover:text-red-500">
              <div className="after:">
                <label
                  htmlFor="latitude"
                  className="text-xs font-normal leading-tight text-blue-gray-500 transition-all font-bold"
                >
                  LATITUDE
                </label>
                <input
                  id="latitude"
                  name="latitude"
                  type="number"
                  className="h-9 border rounded border-stone-300	w-40 hover:border-red-500 hover:text-black px-2"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={(formik.values.latitude = position[0].toFixed(5))}
                ></input>
              </div>
              {formik.errors.latitude && formik.touched.latitude ? (
                <div className="text-red-600 text-xs">
                  {formik.errors.latitude}
                </div>
              ) : null}
            </div>
          </div>
          <div style={{ height: "275px" }} className="mt-3">
            <MapContainer
              style={{ height: "100%", minHeight: "100%", width: "100%" }}
              center={[lat, long]}
              zoom={13}
              scrollWheelZoom={true}
              zoomControl={false}
            >
              <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
              {Region ? (
                <GeoJSON
                  data={Region}
                  style={{
                    weight: 2,
                    opacity: 0.8,
                    color: "red",
                    fillOpacity: 0,
                  }}
                ></GeoJSON>
              ) : null}
              <Marker
                draggable={true}
                eventHandlers={{ dragend: updatePosition }}
                position={position}
                icon={markerIcon}
              >
                <Popup>
                  <b>Is this the place?</b>
                </Popup>
              </Marker>

              <CustomZoomControl />
            </MapContainer>
          </div>

          <div class="flex items-center">
            <input
              checked
              id="checked-checkbox"
              type="checkbox"
              value={0}
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="checked-checkbox"
              class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Verfify this Report
            </label>
          </div>
          {/*  */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="inline-block rounded bg-success px-6 pt-2.5 pb-2 my-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)]"
            >
              Submit
            </button>
            <button className="mx-2 inline-block rounded bg-danger px-6 pt-2.5 pb-2 my-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)]">
              Delete
            </button>
          </div>
        </form>
      </div>

      {/* <CloseIcon
            className="absolute right-2 top-0 mt-4 cursor-pointer text-gray-500"
            onClick={() => {
              setReportActivated(false);
            }}
          /> */}
    </div>
  );
}

export default Edit;
