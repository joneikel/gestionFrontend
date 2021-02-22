import React from "react";
import { MapContainer, TileLayer, GeoJSON, useMapEvents } from "react-leaflet";
import { guaricoJSON } from "./guarico_municipios";

const MapPage = () => {
  const MapHandler = () => {
    const map = useMapEvents({
      click: (event) => {
        console.log(event.latlng);
      },
    });
    return null;
  };

  return (
    <MapContainer
      minZoom={7}
      maxBounds={
        [
          [8.837736025653733, -64.77403896538827],
          [10.039463032268916,-66.40132930682321],
          [8.520722565715932, -68.00997071681127],
          [7.619544310497262, -66.24618167324999]
        ]
      }
      style={{ width: "100%", height: "100%" }}
      scrollWheelZoom={true}
      center={{ lat: 9.913963483473944, lng: -67.35703581437961 }}
      zoom={8.3}
    >
      <MapHandler />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <GeoJSON
        style={(feat: any) => {
          console.log(feat);
          return {
            color: "#2961c4",
            fillColor: "#2961c4",
            fillOpacity: 0.08,
            weight: 1,
            fillRule: "evenodd",
          };
        }}
        data={guaricoJSON}
      />
    </MapContainer>
  );
};

export default MapPage;
