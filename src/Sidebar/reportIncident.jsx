import React, { useState, useEffect } from "react";
import { useFormik, Field } from "formik";
import { Autocomplete } from "@mui/lab";
import { TextField } from "@mui/material";
import * as Yup from "yup";
import CustomDropdown from "../Components/UI/customSelect";

function ReportAnAncident() {
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
  const formik = useFormik({
    initialValues: {
      description: "",
      hazard: "",
      incidentOn: "",
      streetAddress: "",
      image: "",
      region: "",
      latitude: "",
      longitude: "",
    },
    validationSchema: Yup.object({
      description: Yup.string()
        .min(5, "Region must be at least 20 characters long")
        .required("Region is required"),
      incidentOn: Yup.date()
        .max(new Date(), "Incident datetime must be before current time")
        .required("Incident datetime is required"),
      streetAddress: Yup.string().required("Region is required"),
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
  return (
    <div className="absolute w-[50%] z-50 bg-white top-[100] h-[90%] left-[25%] top-[7%]">
      <div className="h-96 self-center">
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-row items-center justify-center lg:justify-start">
            <p className="text-lg mb-0 mr-4 font-bold">Report an Incident</p>
          </div>

          <div className="pt-3">
            <label htmlFor="description">description</label>
            <input
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="description"
              name="description"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            />
            {formik.errors.description && formik.touched.description ? (
              <div className="text-red-600">{formik.errors.description}</div>
            ) : null}
          </div>
          <div className="pt-3 mb-3">
            <label htmlFor="hazard">hazard</label>
            <CustomDropdown
              className="input"
              onChange={(value) => formik.setFieldValue("hazard", value.value)}
              value={formik.values.hazard}
              options={disasterTypeOptions}
            />
            {formik.errors.hazard ? (
              <div className="error">{formik.errors.hazard}</div>
            ) : null}
          </div>
          <div className="pt-3">
            <label htmlFor="incidentOn">Incident On</label>
            <input
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="incidentOn"
              name="incidentOn"
              type="datetime-local"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.incidentOn}
            />
            {formik.errors.incidentOn && formik.touched.incidentOn ? (
              <div className="text-red-600">{formik.errors.incidentOn}</div>
            ) : null}
          </div>
          <div className="pt-3">
            <label htmlFor="streetAddress">Street Address</label>
            <input
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="streetAddress"
              name="streetAddress"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.streetAddress}
            />
            {formik.errors.streetAddress && formik.touched.streetAddress ? (
              <div className="text-red-600">{formik.errors.streetAddress}</div>
            ) : null}
          </div>
          <div className="pt-3">
            <label htmlFor="image">Image</label>
            <input type="file" />
          </div>
          <div className="pt-3">
            <label htmlFor="region">Region</label>
            <CustomDropdown
              className="input"
              onChange={(value) => formik.setFieldValue("region", value.value)}
              value={formik.values.regionNameOptions}
              options={regionNameOptions}
            />
            {formik.errors.region ? (
              <div className="error">{formik.errors.region}</div>
            ) : null}
          </div>
          <div className="pt-3">
            <label htmlFor="longitude">Longitude</label>
            <input
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="longitude"
              name="longitude"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.longitude}
            />
            {formik.errors.longitude && formik.touched.longitude ? (
              <div className="text-red-600">{formik.errors.longitude}</div>
            ) : null}
          </div>
          <div className="pt-3">
            <label htmlFor="latitude">Latitude</label>
            <input
              className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="latitude"
              name="latitude"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.latitude}
            />
            {formik.errors.latitude && formik.touched.latitude ? (
              <div className="text-red-600">{formik.errors.latitude}</div>
            ) : null}
          </div>
          <button type="submit" disabled={!formIsValid}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReportAnAncident;
