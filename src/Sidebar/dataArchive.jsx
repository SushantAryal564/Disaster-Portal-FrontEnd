import React, { useEffect, useState } from "react";
import Header from "./Header";
import Select from "react-select";
import { redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearWard, cleardData, getWarddownloadbuilding, getdateselectedEvents } from "../store/Slices/selecteddata";
import { Sledding } from "@mui/icons-material";

function DataArchieve() {


  // let now = new Date();
  // let oneMonthAgo = new Date(
  //   now.getFullYear(),
  //   now.getMonth() - 1,
  //   now.getDate()
  // );

  // let today = now.toISOString().slice(0, 10);
  // let lastMonth = oneMonthAgo.toISOString().slice(0, 10);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  console.log(startDate, endDate, "DATES------------");


    const options1 = [
    { value: "1", label: "Ward1" },
    { value: "2", label: "Ward2" },
    { value: "3", label: "Ward3" },
    { value: "4", label: "Ward4" },
    { value: "5", label: "Ward5" },
    { value: "6", label: "Ward6" },
    { value: "7", label: "Ward7" },
    { value: "8", label: "Ward8" },
    { value: "9", label: "Ward9" },
    { value: "10", label: "Ward10" },
    { value: "11", label: "Ward11" },
    { value: "12", label: "Ward12" },
    { value: "13", label: "Ward13" },
    { value: "14", label: "Ward14" },
    { value: "15", label: "Ward15" },
    { value: "16", label: "Ward16" },
    { value: "17", label: "Ward17" },
    { value: "18", label: "Ward18" },
    { value: "19", label: "Ward19" },
    { value: "20", label: "Ward20" },
    { value: "21", label: "Ward21" },
    { value: "22", label: "Ward22" },
    { value: "23", label: "Ward23" },
    { value: "24", label: "Ward24" },
    { value: "25", label: "Ward25" },
    { value: "26", label: "Ward26" },
    { value: "27", label: "Ward27" },
    { value: "28", label: "Ward28" },
    { value: "29", label: "Ward29" }
  ];
const handlestart=(e)=>{

 
    console.log(e,"EEEEEEEEEEEEEEEEEEEEEE")
    setStartDate(e.target.value)

}

const handleend=(e)=>{

 
  console.log(e,"EEEEEEEEEEEEEEEEEEEEEE")
  setEndDate(e.target.value)

}

  const [selectedwardbuilding,setWardb]=useState(null);
  // console.log("seledted ward--------------",selectedwardbuilding)


  // const getWardJSONData = async () => {
  //   const data = await fetch(
  //     `http://127.0.0.1:8000/api/v1/spatial/ward/${selectedwardbuilding}/`
  //   );
  //   const wardjson = await data.json();
  //   setWardJSON(wardjson);
  // };
  // console.log(WardJSON)
   const dispatch=useDispatch()
   const [ddata,setddata]=useState(null)
  console.log(ddata)
  useEffect(() => {
   if (selectedwardbuilding) dispatch(getWarddownloadbuilding(selectedwardbuilding))
    
  }, [selectedwardbuilding]);

 
  // const getddata= async () => {
  //   const response = await fetch(
  //     `http://127.0.0.1:8000/api/v1/disaster/disasterEventwithoutgeom/?name=&type=&is_closed=false&startTime__gte=${startDate}T18%3A00%3A00Z&startTime__gt=&startTime=&startTime__lte=${endDate}T18%3A00%3A00Z`
  //   );
  //   const data = await response.json();
  //   setddata(data)
  // }

  const dedata=useSelector(state=>state.selected.dateselectedevent)
  useEffect(()=>{
    if (startDate && endDate){
      dispatch(getdateselectedEvents([startDate,endDate]))
    }

  },[startDate,endDate])
 console.log(dedata,'MILYO')
  const wardStyle = () => {
    return {
      fillColor: `none`,
      opacity: 1,
      weight: 2,
      color: "black",
      fillOpacity: 0.7,
    };
  };
  return (
    <>
      <Header />
      <div>
        <label className="p-2">Select Building data</label>
        <Select options={options1} className="p-2" onChange={(event)=>{
          console.log(event)
          setWardb(event.value)
        }}
           />
          <div className="flex justify-center">
           <button className="text-red-500 text-sm" onClick={()=>dispatch(clearWard())
          
          }>Clear selection</button>
        <button 
          onClick={() => {  
            let downloadUrl='http://localhost:8000/api/v1/analysis/download_building/?ward='+selectedwardbuilding
            console.log("dsa")
            window.location.href = downloadUrl;
          }}
          className="bg-[#418fde] text-white m-2 py-[3px] px-3 rounded-sm"
        >
          Download Shapefile
        </button>{" "}</div>
        
      </div>

      <div className="p-2 border-t-2 border-gray-100 mt-3  bg-gray-100">
        <span className="text-md my-4"> Filter Disaster data</span><br/>
       
       <div className="flex justify-evenly">
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
      <div className="flex justify-center"> 
      
      {/* <div className="flex justify-center */}
           <button className="text-red-500 text-sm" onClick={()=>dispatch(cleardData())
          
          }>Clear selection</button>


      <button 
          onClick={() => {  
            let downloadUrl='http://localhost:8000/api/v1/analysis/download_disaster/?fromdate='+startDate+"&todate="+endDate
             console.log(downloadUrl)
            window.location.href = downloadUrl;
          }}
          className="bg-[#418fde] text-white m-2 py-[3px] px-3 rounded-sm"
        >
          Download Shapefile
        </button>
      </div>
        
      </div>
    </>
  );
}

export default DataArchieve;
