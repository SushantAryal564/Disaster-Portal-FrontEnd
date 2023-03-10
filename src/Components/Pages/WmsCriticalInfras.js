import React from 'react';
import { MapContainer,  TileLayer, useMap,Pane ,WMSTileLayer} from 'react-leaflet';

import L from 'leaflet';

export const WmsCriti= () => {

    return (
    <>
    <Pane name="amyPane" style={{ zIndex: 650 }}>
    <WMSTileLayer url='http://localhost:8080/geoserver/new/wms'
     params={{layers: 'new:buildings',
    format: 'image/png',
    transparent: true,
    version: '1.1.0',
    styles:'ward'}}
    ></WMSTileLayer>
    </Pane>
    </>
  )

    }