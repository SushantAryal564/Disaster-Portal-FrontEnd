import React from 'react';
import { MapContainer,  TileLayer, useMap,Pane ,WMSTileLayer} from 'react-leaflet';

import L from 'leaflet';

export const Wms = (layer) => {
  //  var map=useMap()
  //    var layer=L.tileLayer.wms('http://localhost:8080/geoserver/new/wms', {
  //   layers: 'new:lalitpurWard',
  //   format: 'image/png',
  //   transparent: true,
  //   version: '1.1.0',
  //   styles:'ward'
  //  }).addTo(map);
  //  layer.addTo(map).bringToFront()

    return (
    <>
    <Pane name="myPane" style={{ zIndex: 650 }}>
    <WMSTileLayer url='http://localhost:8080/geoserver/new/wms' params={{layers: 'new:lalitpurWard',
    format: 'image/png',
    transparent: true,
    version: '1.1.0',
    styles:'bu'}}></WMSTileLayer>
    </Pane>
    </>
  )

    }