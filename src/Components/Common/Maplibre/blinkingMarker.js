/* eslint-disable func-names */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-param-reassign */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';

const size = 100;

// This implements `StyleImageInterface`
// to draw a pulsing dot icon on the map.

function BlinkingMarker({ map, coordinates, options, maploaded }) {
  // This implements `StyleImageInterface`
  // to draw a pulsing dot icon on the map.
  const pulsingDot = {
    width: size,
    height: size,
    data: new Uint8Array(size * size * 4),

    // When the layer is added to the map,
    // get the rendering context for the map canvas.
    onAdd() {
      const canvas = document.createElement('canvas');
      canvas.width = this.width;
      canvas.height = this.height;
      this.context = canvas.getContext('2d');
    },

    // Call once before every frame where the icon will be used.
    render() {
      const duration = 1000;
      const t = (performance.now() % duration) / duration;

      const radius = (size / 2) * 0.3;
      const outerRadius = (size / 2) * 0.7 * t + radius;
      const { context } = this;

      // Draw the outer circle.
      context.clearRect(0, 0, this.width, this.height);
      context.beginPath();
      context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
      context.fillStyle = `rgba(255, 255, 0, ${1 - t})`;
      context.fill();

      // Draw the inner circle.
      context.beginPath();
      context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
      context.fillStyle = 'rgba(100, 100, 100, 1)';
      context.strokeStyle = 'white';
      context.lineWidth = 2 + 4 * (1 - t);
      context.fill();
      context.stroke();

      // Update this image's data with data from the canvas.
      this.data = context.getImageData(0, 0, this.width, this.height).data;

      // Continuously repaint the map, resulting
      // in the smooth animation of the dot.
      map.triggerRepaint();

      // Return `true` to let the map know that the image was updated.
      return true;
    },
  };
  const [state, setState] = useState({
    layer: {
      id: 'blinking', // Layer
      type: 'symbol',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates, // icon position [lng, lat]
              },
            },
          ],
        },
      },
      layout: {
        'icon-image': 'pulsing-dot',
      },
      ...options,
    },
  });

  useEffect(() => {
    if (!map) return;

    if (!map?.getLayer(state.layer.id) && maploaded) {
      map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });
      map.addLayer(state.layer);
    }

    return () => {
      if (map.getLayer(state.layer.id)) {
        map.removeLayer(state.layer.id);
        map.removeSource(state.layer.id);
        map.removeImage(state.layer.id);
      }
    };
  }, [map, maploaded]);

  //   useEffect(() => {
  //     setState({
  //       ...state,
  //       layer: {
  //         id: 'default_layer',
  //         type: '',
  //         source: {},
  //         layout: {},
  //         paint: {},
  //         ...options,
  //       },
  //     });
  //   }, [options]);

  //   useEffect(() => {
  //     if (!map) return;

  //     if (map.getLayer(state.layer.id)) {
  //       Object.keys(state.layer.paint).map((property) => {
  //         map?.setPaintProperty(state.layer.id, property, state.layer.paint[property]);
  //         return '';
  //       });
  //     }
  //   }, [map, state?.layer?.paint]);

  return null;
}

export default BlinkingMarker;
