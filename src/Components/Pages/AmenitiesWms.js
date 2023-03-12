import React from 'react';
import { MapContainer,  TileLayer, useMap,Pane ,WMSTileLayer} from 'react-leaflet';

import L from 'leaflet';

export const WmsAmenities= () => {
  const handleClick=()=>{
    console.log('amenities clcked')
  }
    return (
    <>
    <Pane name="bmyPane" style={{ zIndex: 650 }} >
    <WMSTileLayer url='http://localhost:8080/geoserver/new/wms'
     params={{layers: 'new:amenities',
    format: 'image/png',
    transparent: true,
    version: '1.1.0',
    styles:'amenities'}}  interactive={true} 
    ></WMSTileLayer>
    </Pane>
    </>
  )}
