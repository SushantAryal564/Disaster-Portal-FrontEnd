import { useEffect, useState } from 'react';
import { GeoJSON } from "react-leaflet";
import { Marker, Popup, useMap, Polyline } from 'react-leaflet';

import L from 'leaflet'
import { useDispatch, useSelector } from 'react-redux';
import { GetRoute } from '../../store/Slices/damageLegendSlice';
// import { setroute } from '../../store/Slices/damageLegendSlice';
// import { dispatch } from 'd3';

  export default function FindRouteMap() {
    const [start, setStart] = useState( [
          
          27.685233184361863,85.32350410406002,
        ]);
    const [end, setEnd] = useState([
    
        
          27.66729881839521,85.32408208931736,
      ]);
      const dispatch=useDispatch()
    
      const geojson= useSelector(state=>state.damageLegend.currentroute)
  
    // function fetchRoute() {
    //     console.log('FETCHUING============---------==')
    //   const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf62482d8246fe91fc4aefb85d4a6e9b73e86b&start=${start[1]},${start[0]}&end=${end[1]},${end[0]}`;
    //   fetch(url)
    //     .then(response => response.json())
    //     .then(data => {
    //         setGeojson(data)
       
    //     })
        
    // }
  console.log("DATA",geojson)
    function StartMarker() {
    //   const [position, setPosition] = useState(start);
      const map = useMap();
  
      function handleDragEnd(e) {
        // setPosition(e.target.getLatLng());
        setStart([e.target.getLatLng().lat, e.target.getLatLng().lng]);
        
    
        
      }
  
      return (
        <Marker position={start} draggable icon={L.divIcon({
          className: "blinking-marker ",
          iconSize: L.point(15, 15, true),
        })} eventHandlers={{ dragend: handleDragEnd }}>
          <Popup>Start</Popup>
        </Marker>
      )
    }
  
    function EndMarker() {
      const [position, setPosition] = useState(end);
      const map = useMap();
  
      function handleDragEnd(e) {
        // setPosition(e.target.getLatLng());
        setEnd([e.target.getLatLng().lat, e.target.getLatLng().lng]);
    
      }
      
    
      return (
        <Marker position={end} draggable icon={L.divIcon({
          className: "blinking-marker",
          iconSize: L.point(15, 15, true),
        })} eventHandlers={{ dragend: handleDragEnd }}>
          <Popup>End</Popup>
        </Marker>
      )
    }
    console.log('okkkkkkkkkkkkkkkkkkk',geojson?.features[0]?.geometry?.coordinates)
    const styleGEOJSON = (feature) => {
        return {
          fillColor: `red`,
          opacity: 1,
          weight: 0,
          color: "red",
          fillOpacity: 0.7,
        };
      };
const map=useMap()

useEffect(()=>{
    // fetchRoute()
    dispatch(GetRoute([start,end]))
},[start,end])
useEffect(() => {
   
console.log("RUNING USE effect")
  if (geojson) {
    // Create the GeoJSON layer and add it to the map
    let newLayer = new L.GeoJSON(geojson);
    newLayer.addTo(map);
    return () => {
        map.removeLayer(newLayer);
      };
    // Return a function to remove the layer when the component unmounts
}

}, [geojson]);
 ;

    return (
      <>
        <StartMarker />
        <EndMarker />
        {/* {geojson && <GeoJSON   style={styleGEOJSON}  data={geojson} />} */}
        {/* {geojson&& <Polyline positions={[geojson.features[0].geometry.coordinates]}></Polyline>} */}
      </>
    )
  }