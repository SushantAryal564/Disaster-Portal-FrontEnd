import React, { useEffect } from "react";
/* eslint-disable */

function GeoserverWMS({ map }) {
  useEffect(() => {
    if (!map) return;

    map.on("load", function () {
      map.addSource("mapillary", {
        type: "vector",
        tiles: [
          //   'https://tiles.mapillary.com/maps/vtp/mly1_public/2/{z}/{x}/{y}?access_token=MLY|4142433049200173|72206abe5035850d6743b23a49c41333',
          // 'http://192.168.101.38:8000/api/v1/tiles/koboform/public/core_site/2/2/1.pbf?fields=name',
          "https://fastapi-vectortile.naxa.com.np/api/v1/tiles/koboform/public/core_featurecollection/{z}/{x}/{y}.pbf?fields=id&cql_filter=feature_id%3D78",
          // 'http://192.168.101.38:8000/api/v1/tiles/koboform/public/core_site/{z}/{x}/{y}.pbf?fields=name&cql_filter=project_id%3D454&sql_filter=core_site.project_id%3D255',
        ],
        minzoom: 0,
        maxzoom: 14,
      });
      map.addLayer({
        id: "mapillary", // Layer ID
        type: "fill-extrusion",
        source: "mapillary", // ID of the tile source created above
        // Source has several layers. We visualize the one with name 'sequence'.
        "source-layer": "public.core_featurecollection",
        layout: {
          //   'line-cap': 'round',
          //   'line-join': 'round',
        },
        paint: {
          // 'circle-radius': {
          //   stops: [
          //     [5, 1],
          //     [15, 1024],
          //   ],
          //   base: 2,
          // },
          // 'circle-color': 'red',
          // 'circle-opacity': 0.6,
          // 'fill-color': 'red',
          // 'fill-opacity': 0.2,
          "fill-extrusion-color": "blue",
          "fill-extrusion-height": ["+", ["get", "id"], 2],
          "fill-extrusion-opacity": 0.6,
        },
      });
    });

    setTimeout(() => {
      var properties = map?.getLayer("mapillary");
    }, 5000);
  }, [map]);
  return <></>;
}

export default GeoserverWMS;
