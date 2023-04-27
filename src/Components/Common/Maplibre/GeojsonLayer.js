import { useEffect } from "react";
function GeojsonLayer({ map, geojson, uniqueName, type, paint, layout = {} }) {
  useEffect(() => {
    if (!map) return;
    map.on("load", () => {
      map.addLayer({
        id: uniqueName,
        type,
        source: {
          type: "geojson",
          data: geojson,
        },
        layout,
        paint,
      });
    });
  }, [map]);
  return null;
}

export default GeojsonLayer;
