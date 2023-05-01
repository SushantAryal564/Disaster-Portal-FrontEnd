import { useEffect ,useState} from "react";
import { useMap } from "react-leaflet";
// import { GeoJSONSource } from "react-map-gl";
import { GeoJSON } from "react-leaflet";
import { useSelector } from "react-redux";
import L from "leaflet";
function DownloadWardGeoJSONRender({data}) {
    
    const downloablebuildingarchive = useSelector((state) => state.selected.selectionDownloadWardbuilding);
  
    const wardstyle2={
        fillColor: `green`,
        opacity: 1,
        weight: 1,
        color: "green",
        fillOpacity: 0.7,
      };


      useEffect(()=>{
        const geojsonLayer = L.geoJSON(downloablebuildingarchive, {
            style: wardstyle2,
          }).addTo(map);
    
          // Fit the map bounds to the GeoJSON layer
          map.fitBounds(geojsonLayer.getBounds());
        //   map.setZoom(14)
        if (!downloablebuildingarchive){
            console.log('UNDO ZOOM')
            map.setView([27.541967,85.334297],13)
          }
          return () => {
            if (geojsonLayer) {
              geojsonLayer.removeFrom(map);
            }
          };
         
      },[downloablebuildingarchive])
 
  const map=useMap()
    return (
        <>
        </>
    )
}
export default  DownloadWardGeoJSONRender;