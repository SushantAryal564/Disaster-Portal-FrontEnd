import React, { useEffect, useState } from "react";
import Header from "./Header";
import Select from "react-select";
import { redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearWard, getWarddownloadbuilding } from "../store/Slices/selecteddata";
import { Sledding } from "@mui/icons-material";

function DataArchieve() {

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

  useEffect(() => {
   if (selectedwardbuilding) dispatch(getWarddownloadbuilding(selectedwardbuilding))
  }, [selectedwardbuilding]);

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
            window.location.href = downloadUrl;
          }}
          className="bg-[#418fde] text-white m-2 py-[3px] px-3 rounded-sm"
        >
          Download Shapefile
        </button>{" "}</div>
        
      </div>

      <div>
        <label className="p-2"> Filter Disaster data</label>
        
        
      </div>
    </>
  );
}

export default DataArchieve;
