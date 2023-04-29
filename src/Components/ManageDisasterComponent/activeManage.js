import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillInfoCircle } from "react-icons/ai";
// import { BiAlarm } from "react-icons/bi";
import { string } from "yup";
import AccordianDyn from "../UI/DynamicAccord";
import { BiAlarm } from "react-icons/bi";
import { setlatlng } from "./../../store/Slices/latlng";
const ActiveManage = ({ changeMarkerDataState }) => {
  const [wardIncident, setWardIncident] = useState([]);
  const wardId = localStorage.getItem("WardId");
  console.log(wardId, "ward id");
  let now = new Date();
  let oneMonthAgo = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    now.getDate()
  );

  let today = now.toISOString().slice(0, 10);
  let lastMonth = oneMonthAgo.toISOString().slice(0, 10);
  const [startDate, setStartDate] = useState(lastMonth);
  const [endDate, setEndDate] = useState(today);
  console.log(startDate, endDate, "DATES");
  const WardIncident = async (wardId, startDate, endDate) => {
    // var i=`http://127.0.0.1:8000/api/v1/disaster/disasterEventwithoutgeom/?name=&Ward=${wardId}&type=&is_closed=false&startTime__gte=${startDate}T18%3A00%3A00Z&startTime__gt=&startTime=&startTime__lte=${endDate}T18%3A00%3A00Z`
    // console.log(i)
    // var i= ` http://127.0.0.1:8000/api/v1/disaster/disasterEventwithoutgeom/?name=&Ward=${wardId}&type=&is_closed=false&startTime__gte=${startDate}T18%3A00%3A00Z&startTime__lte=${endDate}T18%3A00%3A00Z`
    // console.log('ENDPOINT FOR WARD WISE DISASTER',i)

    // console.log(`http://127.0.0.1:8000/api/v1/disaster/disasterEventwithoutgeom/?name=&Ward=${wardId}&type=&is_closed=false`,'NODATE ENDPOINT')

    let data = await fetch(
      `http://127.0.0.1:8000/api/v1/disaster/disasterEvent/?name=&Ward=${wardId}&type=&is_closed=&startTime__gte=&startTime__gt=&startTime__lt=`
    //   `http://127.0.0.1:8000/api/v1/disaster/disasterEvent/?name=&Ward=${wardId}&type=&is_closed=&startTime__gte=${startDate}&startTime__gt=&startTime__lt=${endDate}`
    );
    // var rem=`&startTime__gte=${startDate}T18%3A00%3A00Z&startTime__gt=&startTime=&startTime__lte=${endDate}T18%3A00%3A00Z`

    let wardIncident = await data.json();

    changeMarkerDataState(wardIncident);
    setWardIncident(wardIncident);
  }
  let dispatch = useDispatch();
  const latlngHandler = (array) => {
    dispatch(setlatlng(array));}

  useEffect(() => {
    WardIncident(wardId, lastMonth, today);
  }, []);
  return (
    <React.Fragment>
   <AccordianDyn AllDisaster={wardIncident}   latlngHandler={latlngHandler}></AccordianDyn>
    </React.Fragment>
  );
};

export default ActiveManage;
