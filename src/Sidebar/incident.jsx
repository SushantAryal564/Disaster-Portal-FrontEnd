import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { disasterIncidnetAsyncGETThunk } from "../store/Slices/incidentSlice";
import { AiFillInfoCircle } from "react-icons/ai";
import { BiAlarm } from "react-icons/bi";
import Header from "./Header";
function Incident({ reportActivated }) {
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
  console.log(startDate, endDate);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(disasterIncidnetAsyncGETThunk([startDate,endDate]));
  }, [reportActivated,startDate,endDate]);
  let disasterIncidentData = useSelector(
    (state) => state.disasterIncident.data
  );

console.log("DATE STAATES---------------",startDate,endDate)
const handlestart=(e)=>{
    setStartDate(e.target.value)

}

const handleend=(e)=>{
  setEndDate(e.target.value)

}
  return (
    <React.Fragment>
      <Header />
      <div className="flex justify-evenly pt-3 ">
      <div className="m-2"> <label
                htmlFor="incidentOn1"
                className="text-xs font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-red-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight font-bold"
              >
                Start Date
              </label>
              <input
                className=" peer h-8 w-full border-b border-blue-gray-200 bg-transparent  font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all focus:border-red-500 focus:outline-0 disabled:border-8 disabled:bg-blue-gray-50 hover:text-black "
                id="incidentOn1"
                name="incidentOn1"
                type="date"
                onChange={handlestart}
                // onBlur={formik.handleBlur}
                //  defaultValue={startDate}
                value={startDate}
              /></div>

<div className="m-2">
<label
                htmlFor="incidentOn"
                className="text-xs font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-2.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-red-500 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight font-bold"
              >
                End Date
              </label>
              <input
                className=" peer h-8 w-full border-b border-blue-gray-200 bg-transparent  font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all focus:border-red-500 focus:outline-0 disabled:border-8 disabled:bg-blue-gray-50 hover:text-black "
                id="incidentOn"
                name="incidentOn"
                type="date"
                onChange={handleend}
                // onBlur={formik.handleBlur}
                // value={formik.values.incidentOn}
                // defaultValue={endDate}
                value={endDate}
              />

</div>

       </div>
     

      <div className="px-4 h-[83vh] overflow-x-scroll scrollbar scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-w-1 scrollbar-rounded-rounded-md">
        {disasterIncidentData.map((data) => {
          return (
            <div className="border-gray-200 border-b-2 p-3 hover:bg-gray-200 py-4">
              <div className="text-md font-medium flex flex-row ">
                <div className="text-red-500 text-sm flex flex-col">
                  <span className="px-3">
                    {" "}
                    <AiFillInfoCircle size={20} />
                  </span>
                  <p className="text-xs">{data?.type?.title || "none"}</p>
                </div>
                <span className="font-normal ml-5 pt-1 text-sm">
                  <div className="font-semibold text-xs"> {data.name}</div>
                  <div>
                    <div className="text-xs  text-gray-500 flex justify-start ">
                      <span className="">{data.date}</span>
                      <div className="flex items-center px-2">
                        <span>
                          <BiAlarm />
                        </span>
                        <span className="pl-1">{data.time || "none"}</span>
                      </div>
                    </div>
                  </div>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
}

export default Incident;
