import React from 'react';
import {
  Map,
  TileLayer,
  GeoJSON,
} from 'react-leaflet';

const URL_API = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

export default function LeafletMap({
  farm = {},
  farmGeoJson,
}) {
  if (!farm.farmId) {
    return null;
  }

  const { latitude, longitude } = farm;
  const center = [latitude, longitude];

  return (
    <Map
      className="leaflet"
      center={center}
      zoom={15}
      key={farm.farmId}>
      <TileLayer
        attribution="Gaivota"
        url={URL_API} />

      <GeoJSON
        data={farmGeoJson}
        key={farm.farmId + (farmGeoJson && farmGeoJson._id)} />
    </Map>
  );
}
