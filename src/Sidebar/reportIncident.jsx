import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CloseIcon from "@mui/icons-material/Close";
import Select, { StylesConfig } from "react-select";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Map } from "leaflet";
function ReportAnAncident({ setReportActivated }) {
  const [markerPosition, setMarkerPosition] = useState({ lat: 0, lng: 0 });
  const [disaster, setDisaster] = useState([]);
  const [Region, SetRegion] = useState([]);
  const disasterTypeGET = async () => {
    const data = await fetch(
      "http://127.0.0.1:8000/api/v1/disaster/disasterType/"
    );
    let disaster = await data.json();
    setDisaster(disaster);
  };
  const RegionNameGET = async () => {
    const data = await fetch("http://127.0.0.1:8000/api/v1/spatial/ward/");
    let region = await data.json();
    SetRegion(region.features);
  };
  useEffect(() => {
    disasterTypeGET();
    RegionNameGET();
  }, []);
  const disasterTypeOptions = disaster.map((disaster) => {
    return { value: disaster.title, label: disaster.title };
  });
  const regionNameOptions = Region.map((region) => {
    return {
      value: region.properties.palika + " " + region.properties.ward,
      label: region.properties.palika + " " + region.properties.ward,
    };
  });
  const handleMarkerDragEnd = (e) => {
    setMarkerPosition(e.target.getLatLng());
  };
  const formik = useFormik({
    initialValues: {
      description: "",
      hazard: "",
      incidentOn: "",
      streetAddress: "",
      image: null,
      region: "",
      latitude: "",
      longitude: "",
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
      console.log("I am here");
      alert(JSON.stringify(values, null, 2));
    },
  });
  let formIsValid = true;
  if (
    formik.errors.description ||
    formik.touched.description ||
    formik.errors.hazard ||
    formik.touched.hazard ||
    formik.errors.incidentOn ||
    formik.touched.incidentOn ||
    formik.errors.streetAddress ||
    formik.touched.streetAddress ||
    formik.errors.image ||
    formik.touched.image ||
    formik.errors.region ||
    formik.touched.region ||
    formik.errors.latitude ||
    formik.touched.latitude ||
    formik.errors.longitude ||
    formik.touched.longitude
  ) {
    formIsValid = false;
  } else {
    formIsValid = true;
  }
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
  const center = {
    lat: 51.505,
    lng: -0.09,
  };
  function DraggableMarker() {
    const [draggable, setDraggable] = useState(false);
    const [position, setPosition] = useState(center);
    const markerRef = useRef(null);
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current;
          if (marker != null) {
            setPosition(marker.getLatLng());
          }
        },
      }),
      []
    );
    const toggleDraggable = useCallback(() => {
      setDraggable((d) => !d);
    }, []);

    return (
      <Marker
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={position}
        ref={markerRef}
      >
        <Popup minWidth={90}>
          <span onClick={toggleDraggable}>
            {draggable
              ? "Marker is draggable"
              : "Click here to make marker draggable"}
          </span>
        </Popup>
      </Marker>
    );
  }

  return (
    <div className="absolute w-[40%] z-50 bg-white h-[90%] left-[50%] top-[7%] px-8 border rounded shadow-2xl scrollbar scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-w-1 scrollbar-rounded-rounded-md translate-x-[-50%]">
      <div className="h-96 self-center text-gray-500">
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-row items-center justify-center lg:justify-start ">
            <p className=" mb-12 mt-4 ">Report an incident</p>
          </div>
          <div className="pt-3">
            <div class="relative h-11 w-full min-w-[200px]">
              <input
                className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-red-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                id="description"
                name="description"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
              />
              <label class="after:content[' '] pointer-events-none absolute left-0 -top-2.5 flex h-full w-full select-none text-xs font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-red-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-placeholder-shown:text-blue-gray-500 peer-focus:text-xs peer-focus:leading-tight peer-focus:text-red-500 peer-focus:after:scale-x-100 peer-focus:after:border-red-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 font-bold">
                DESCRIPTION
              </label>
            </div>
            {formik.errors.description && formik.touched.description ? (
              <div className="text-red-600 text-xs">
                {formik.errors.description}
              </div>
            ) : null}
          </div>
          <div className="pt-3 flex gap-10 ">
            <div className="w-full hover:text-red-500">
              <label
                htmlFor="hazard"
                className="text-xs font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-red-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight font-bold"
              >
                HAZARD
              </label>
              <Select
                className="input hover:text-black"
                styles={colourStyles}
                onChange={(value) =>
                  formik.setFieldValue("hazard", value.value)
                }
                value={formik.values.disasterTypeOptions}
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
          <div className="pt-3 mt-5">
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
            <div className="pt-3 hover:text-red-500">
              <label
                htmlFor="region"
                className="text-xs font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-red-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight font-bold "
              >
                REGION
              </label>
              <Select
                className="input hover:text-black "
                onChange={(value) =>
                  formik.setFieldValue("region", value.value)
                }
                styles={colourStyles}
                value={formik.values.regionNameOptions}
                options={regionNameOptions}
              />
              {formik.errors.region ? (
                <div className="text-red-600 text-xs">
                  {formik.errors.region}
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
                className="h-9 border rounded border-stone-300 w-40 hover:border-red-500 hover:text-black		"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.longitude}
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
                  LONGITUDE
                </label>
                <input
                  id="latitude"
                  name="latitude"
                  type="number"
                  className="h-9 border rounded border-stone-300	w-40 hover:border-red-500 hover:text-black	"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.latitude}
                ></input>
              </div>
              {formik.errors.latitude && formik.touched.latitude ? (
                <div className="text-red-600 text-xs">
                  {formik.errors.latitude}
                </div>
              ) : null}
            </div>
          </div>
          <div style={{ height: "275px" }} className="mt-5">
            <MapContainer
              style={{ height: "100%", minHeight: "100%" }}
              center={[27.66445354418368, 85.31856628971687]}
              zoom={13}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <DraggableMarker />
            </MapContainer>
          </div>
          <button type="submit" disabled={!formIsValid}>
            Submit
          </button>
        </form>
      </div>

      <CloseIcon
        className="absolute right-2 top-0 mt-4 cursor-pointer text-gray-500"
        onClick={() => {
          setReportActivated(false);
        }}
      />
    </div>
  );
}

export default ReportAnAncident;
