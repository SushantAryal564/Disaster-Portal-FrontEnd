import React from 'react';
import { MapContainer,  TileLayer, useMap,Pane ,WMSTileLayer} from 'react-leaflet';

import L from 'leaflet';

export const WmsAmenities= () => {
    return (
    <>
    <Pane name="bmyPane" style={{ zIndex: 650 }}>
    <WMSTileLayer url='http://localhost:8080/geoserver/new/wms'
     params={{layers: 'new:amenities',
    format: 'image/png',
    transparent: true,
    version: '1.1.0',
    styles:'amenities'}}
    ></WMSTileLayer>
    </Pane>
    </>
  )}
