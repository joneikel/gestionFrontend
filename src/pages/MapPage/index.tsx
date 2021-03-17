import { useCallback } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  LayersControl,
  LayerGroup,
  useMap,
  Marker,
  SVGOverlay,
} from "react-leaflet";
import { guaricoJSON } from "./guarico_municipios";

const MapPage = () => {

  return (
    <MapContainer
      minZoom={7}
      /*       maxBounds={[
              [8.837736025653733, -64.77403896538827],
              [10.039463032268916, -66.40132930682321],
              [8.520722565715932, -68.00997071681127],
              [7.619544310497262, -66.24618167324999],
            ]} */
      style={{ width: "100%", height: "100%" }}
      scrollWheelZoom={true}
      center={{ lat: 9.913963483473944, lng: -67.35703581437961 }}
      zoom={8.3}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LayersControl>
        <LayerGroup >
          <GeoJSONGuarico />
        </LayerGroup>
      </LayersControl>
    </MapContainer>
  );
};

const GeoJSONGuarico = () => {
  const map = useMap();
  const onClick = useCallback(
    (event) => {
      map.setView(event.latlng, 9);
    }, [map]);

  return (
    <GeoJSON
      eventHandlers={{
        click: onClick
      }}
      style={(feat: any) => {
        return {
          color: feat.properties.fill,
          fillColor: feat.properties.fill,
          fillOpacity: 0.5,
          weight: 1,
          fillRule: "evenodd",
        };
      }}
      data={guaricoJSON}
    />
  )
}

export default MapPage;
