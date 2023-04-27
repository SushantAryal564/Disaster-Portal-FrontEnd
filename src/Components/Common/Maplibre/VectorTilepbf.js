/* eslint-disable no-param-reassign */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';

function VectorTilepbf({ map, options, maploaded }) {
  const [state, setState] = useState({
    layer: {
      id: 'default_layer', // Layer ID
      type: '',
      source: {},
      layout: {},
      paint: {},
      ...options,
    },
  });

  useEffect(() => {
    if (!map) return;

    if (!map?.getLayer(state.layer.id) && maploaded) {
      map.addLayer(state.layer);
    }

    return () => {
      if (map.getLayer(state.layer.id)) {
        map.removeLayer(state.layer.id);
        map.removeSource(state.layer.id);
      }
    };
  }, [map, maploaded]);

  useEffect(() => {
    setState({
      ...state,
      layer: {
        id: 'default_layer',
        type: '',
        source: {},
        layout: {},
        paint: {},
        ...options,
      },
    });
  }, [options]);

  useEffect(() => {
    if (!map) return;

    if (map.getLayer(state.layer.id)) {
      Object.keys(state.layer.paint).map((property) => {
        map?.setPaintProperty(state.layer.id, property, state.layer.paint[property]);
        return '';
      });
    }
  }, [map, state?.layer?.paint]);

  return null;
}

export default VectorTilepbf;
