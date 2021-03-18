import { useCallback, useState } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  useMap,
  SVGOverlay,
  Marker,
  Tooltip
} from "react-leaflet";
import { useActivities } from "../../hooks/useActivities";
import { guaricoJSON } from "./guarico_municipios";
import MunicipalityInfo from "./MunicipalityInfo";
import L from 'leaflet';
import icon from "leaflet/dist/images/marker-icon.png";
const MapPage = () => {

  const newicon = L.icon({
    iconUrl: icon,
    iconSize: [30, 50]
  })

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedMunicipalityCode, setSelectedMunicipalityCode] = useState<string | undefined>();

  const [activities, loadingActivities] = useActivities({});

  return (
    <>
      <MapContainer
        doubleClickZoom={false}
        minZoom={8}
        /*maxBounds={[
          [8.837736025653733, -64.77403896538827],
          [10.039463032268916, -66.40132930682321],
          [8.520722565715932, -68.00997071681127],
          [7.619544310497262, -66.24618167324999],
        ]} */
        style={{ width: "100%", height: "100%" }}
        scrollWheelZoom={true}
        center={{ lat: 9.023089283030258, lng: -66.5079173567466 }}
        zoom={8.3}
      >
        <TileLayer url="https://mt2.google.com/vt/lyrs=r&x={x}&y={y}&z={z}" />
        <MunicipalityInfo
          municipalityCode={selectedMunicipalityCode}
          isOpen={isSidebarOpen} onClose={() => {
            setIsSidebarOpen(false);
            setSelectedMunicipalityCode(undefined);
          }} />
        <GeoJSONGuarico onFeatureDblClick={(e: any, code: string) => {
          setIsSidebarOpen(true);
          setSelectedMunicipalityCode(code);
        }} />
        <MapLabels features={guaricoJSON} />
        {activities.filter((act) => act.lat && act.lng && act.parroquia.municipio.code === selectedMunicipalityCode)
          .map(({ lat, lng, name }) => {
            return lat && lng && <Marker icon={newicon} position={{ lat, lng }}>
              <Tooltip>{name}</Tooltip>
            </Marker>
          })}
      </MapContainer>
    </>
  );
};

const MapLabels = ({ features }: { features: any[] }) => {

  const map = useMap();
  const onClick = useCallback(
    (event) => map.setView(event.sourceTarget.feature.properties.CENTER),
    [map]
  )

  return guaricoJSON.features.map((feat: any) => {
    return (
      <SVGOverlay
        attributes={{ stroke: 'red' }}
        bounds={[
          [feat.properties.CENTER.lat - 0.1, feat.properties.CENTER.lng],
          [feat.properties.CENTER.lat, feat.properties.CENTER.lng + 1]
        ]}>
        <text
          onClick={() => console.log(feat)}
          style={{ WebkitTextStroke: '1px white' }}
          fontSize="12px"
          width="100%"
          height="100%"
          x="1%"
          y="60%"
          stroke="black">
          {feat.properties.NAME_2}
        </text>
      </SVGOverlay>
    )
  })
}

const GeoJSONGuarico = ({ onFeatureDblClick }: { onFeatureDblClick: Function }) => {
  const map = useMap();

  const onClick = useCallback(
    (event) => {
      //map.setView([event.sourceTarget.feature.properties.CENTER.lat, event.sourceTarget.feature.properties.CENTER.lng + .5], 9.5);
      //onFeatureDblClick(event);
    },
    [map]
  );

  const onDblClick = useCallback(
    (event) => {
      map.setView([event.sourceTarget.feature.properties.CENTER.lat, event.sourceTarget.feature.properties.CENTER.lng + .5], 9.5);
      onFeatureDblClick(event, event.sourceTarget.feature.properties.CODE);
    }, [map, onFeatureDblClick]
  )

  return (
    <GeoJSON
      eventHandlers={{
        click: onClick,
        dblclick: onDblClick,
      }}
      style={(feat: any) => {
        return {
          color: feat.properties.fill,
          fillColor: feat.properties.fill,
          fillOpacity: 0.4,
          weight: 0.2,
          fillRule: "evenodd",
        };
      }}
      data={guaricoJSON}
    />
  );
};

export default MapPage;
