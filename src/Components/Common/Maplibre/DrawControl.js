/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/prop-types */
import React, { Children, cloneElement, useEffect, useState } from "react";
import MapboxDraw from "@mapbox/mapbox-gl-draw";

import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

const DirectSelectMode = MapboxDraw.modes.direct_select;
const DrawPolygon = MapboxDraw.modes.draw_polygon;

const _dragVertex = DirectSelectMode.dragVertex;
const _onMouseMove = DrawPolygon.onMouseMove;

// eslint-disable-next-line func-names
DirectSelectMode.dragVertex = function (state, e, delta) {
  const result = _dragVertex.apply(this, [state, e, delta]);

  const feature = state.feature.toGeoJSON();

  this.map.fire("draw.liveUpdate", {
    features: [feature],
  });

  return result;
};

// eslint-disable-next-line func-names
DrawPolygon.onMouseMove = function (state, e) {
  const feature = state.polygon.toGeoJSON();

  // const result = _onMouseMove.apply(this, [state, e]);
  _onMouseMove(state, e);

  this.map.fire("draw.liveUpdate", { features: [feature] });

  // return result;
};
function DrawControl({ map, children }) {
  const childrenCount = Children.count(children);
  const [draw, setDraw] = useState(null);

  useEffect(() => {
    if (!map) return;
    const draww = new MapboxDraw(
      {
        modes: {
          ...MapboxDraw.modes,
          direct_select: DirectSelectMode,
          draw_polygon: DrawPolygon,
        },
        displayControlsDefault: false,
        controls: {
          polygon: true,
          trash: true,
        },
      },
      MapboxDraw.modes
    );
    window.draww = draww;
    map.addControl(draww, "bottom-left");
    setDraw(draww);
  }, [map]);

  return (
    <>
      {childrenCount < 1 ? (
        <></>
      ) : childrenCount > 1 ? (
        Children.map(children, (child) =>
          child ? cloneElement(child, { map, draw }) : <></>
        )
      ) : (
        cloneElement(children, { map, draw })
      )}
    </>
  );
}

export default DrawControl;

// export { DirectSelectMode };
