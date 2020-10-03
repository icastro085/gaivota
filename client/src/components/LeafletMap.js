import React, { useEffect } from 'react';
import L from 'leaflet';

const PUBLIC_TOKEN = 'pk.eyJ1IjoiaWNhc3RybzA4NSIsImEiOiJja2Z1YnlwbmwwZGI0MnNvOXg4NHVvbXIzIn0.1P7U5XJeGm1Qfqv_v7nPfA';
const URL_API = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}';

export default function LeafletMap() {
  useEffect(() => {
    const mymap = L.map('mapid').setView([51.505, -0.09], 13);

    L.tileLayer(URL_API, {
      attribution: 'Mapa Gaivota',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: PUBLIC_TOKEN,
    }).addTo(mymap);
  }, []);

  return (
    <div id="mapid" className="leaflet" />
  );
}
