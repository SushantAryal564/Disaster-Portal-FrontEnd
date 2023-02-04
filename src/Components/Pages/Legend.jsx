import { LayersControl, Map, TileLayer } from 'react-leaflet';

function Legend({ position = 'bottomright' }) {
  console.log("legend rendered")
  return (
    <div className={`legend leaflet-${position}`}>
      <div>
        <span className="legend-item" style={{ backgroundColor: 'red' }}></span>
        <span>High Pollution</span>
      </div>
      <div>
        <span className="legend-item" style={{ backgroundColor: 'yellow' }}></span>
        <span>Moderate Pollution</span>
      </div>
      <div>
        <span className="legend-item" style={{ backgroundColor: 'green' }}></span>
        <span>Low Pollution</span>
      </div>
    </div>
  );
}
export default Legend
//DISCARDED FILE