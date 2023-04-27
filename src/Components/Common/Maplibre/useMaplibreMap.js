/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import maplibreGl from "maplibre-gl";

function useMaplibreMap(options) {
  const [map, setMap] = useState(null);
  const [maploaded, setMaploaded] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    const opts = {
      container: mapRef.current,
      pitch: 45,
      hash: true,
      style: {
        version: 8,
        sources: {
          osm: {
            type: "raster",
            tiles: [
              "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            ],
            tileSize: 256,
            maxzoom: 20,
          },
          terrainSource: {
            type: "raster-dem",
            tiles: [
              "https://vtc-cdn.maptoolkit.net/terrainrgb/{z}/{x}/{y}.webp",
            ],
            encoding: "mapbox",
            maxzoom: 14,
            minzoom: 4,
          },
        },
        layers: [
          {
            id: "osm",
            type: "raster",
            source: "osm",
          },
        ],
        terrain: {
          source: "terrainSource",
          exaggeration: 1,
        },
      },
      ...options,
    };

    const mapInstance = new maplibreGl.Map(opts);
    mapInstance.addControl(new maplibreGl.NavigationControl());
    mapInstance.addControl(
      new maplibreGl.TerrainControl({
        source: "terrainSource",
        exaggeration: 1,
      })
    );

    mapInstance.on("load", () => {
      setMaploaded(true);
    });
    window.mapp = mapInstance;
    setMap(mapInstance);
  }, []);
  return { map, mapRef, maploaded };
}

export default useMaplibreMap;
