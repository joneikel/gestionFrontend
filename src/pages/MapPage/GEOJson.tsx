import { useCallback, useState } from "react";
import { useMap, useMapEvents, GeoJSON } from "react-leaflet";

const GeoJSONGuarico = ({
    onFeatureDblClick,
    geoJson,
    opacity,
    lineWeight,
    lineColor
  }: {
    onFeatureDblClick?: Function;
    geoJson: any,
    opacity?: number,
    lineWeight?: number,
    lineColor?: string
  }) => {
    const map = useMap();
    const [_opacity, setOpacity] = useState(opacity || 0.5);
  
    useMapEvents({
      zoomend: (e) => {
        if (e.target._zoom >= 13) setOpacity(0.02);
        else setOpacity(0.5);
      }
    });
  
    const onDblClick = useCallback(
      (event) => {
        map.setView(
          [
            event.sourceTarget.feature.properties.CENTER.lat,
            event.sourceTarget.feature.properties.CENTER.lng + 0.5,
          ],
          9.5
        );
        onFeatureDblClick && onFeatureDblClick(event, event.sourceTarget.feature.properties.CODE);
      },
      [map, onFeatureDblClick]
    );
  
    return (
      <GeoJSON
        key="municipios"
        eventHandlers={{
          dblclick: onDblClick,
        }}
        style={(feat: any) => {
          return {
            color: lineColor || feat.properties.fill,
            fillColor: feat.properties.fill,
            weight: lineWeight || 0.2,
            fillRule: "evenodd",
          };
        }}
        pathOptions={{
          fillOpacity: _opacity,
        }}
        data={geoJson}
      />
    );
  };

  export default GeoJSONGuarico;