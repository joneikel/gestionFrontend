import { useState } from "react";
import {
  MapContainer,
  TileLayer,
} from "react-leaflet";
import { guaricoJSON } from "./guarico_municipios";
import MunicipalityInfo from "./MunicipalityInfo";
import L from "leaflet";
import salud from '../../assets/svg-icons/salud.svg';
import { Institution } from "../../models";
import { getSvgIconByAreaCode } from "../../helpers/icons";
import ProjectListModal from "../ProjectPage/components/ProjectListModal";
import MapFilters, { MapFiltersOpts, MapFilterToggle } from "./MapFilters";
import MapLabels from "./MapLabels";
import GeoJSONGuarico from "./GEOJson";
import MapActivities from "./MapActivities";

export const defaultMarker = L.icon({
  iconUrl: salud,
  iconSize: [30, 50],
});

const MapPage = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isBottombarOpen, setIsBottombarOpen] = useState(false);
  const [projectModal, setProjectModal] = useState<onProjectClickProps>({ isOpen: false });
  const [selectedMunicipalityCode, setSelectedMunicipalityCode] = useState<
    string | undefined
  >();
  const [checkedIntitutions, setCheckedInstitutions] = useState<ActivityCardData[]>([]);
  const [filters, setFilters] = useState<MapFiltersOpts>();

  return (
    <>
      <MapContainer
        id="map-container"
        zoomControl={false}
        doubleClickZoom={false}
        minZoom={8}
        style={{ width: "100%", height: "100%" }}
        scrollWheelZoom={true}
        center={{ lat: 9.023089283030258, lng: -66.5079173567466 }}
        zoom={8.3}
      >
        <TileLayer url="https://mt2.google.com/vt/lyrs=r&x={x}&y={y}&z={z}" />
        <MapFilters
          onChange={setFilters}
          onClose={() => setIsBottombarOpen(false)}
          isSidebarOpen={isSidebarOpen}
          isOpen={isBottombarOpen} />
        <MapFilterToggle isOpen={isBottombarOpen} onClick={() => setIsBottombarOpen(!isBottombarOpen)} />
        <MunicipalityInfo
          checkedIntitutions={checkedIntitutions}
          onLoad={(data) => setCheckedInstitutions([data, ...checkedIntitutions])}
          onUnload={({ institution_id, municipio_id }) => setCheckedInstitutions(checkedIntitutions.filter(a => {
            return !(a.municipio_id === municipio_id && a.institution_id === institution_id)
          }
          ))}
          onProjectsClick={({ institution_id, municipio_id }) => setProjectModal({ isOpen: true, institution_id, municipio_id })}
          municipalityCode={selectedMunicipalityCode}
          isOpen={isSidebarOpen}
          onClose={() => {
            console.log(checkedIntitutions);
            setIsSidebarOpen(false);
            setSelectedMunicipalityCode(undefined);
          }}
        />
        <ProjectListModal
          isOpen={projectModal.isOpen}
          filters={{ institution_id: projectModal.institution_id, municipio_id: projectModal.municipio_id }}
          onClose={() => setProjectModal({ isOpen: false })} />
        <GeoJSONGuarico
          opacity={0.5}
          geoJson={guaricoJSON}
          onFeatureDblClick={(e: any, code: string) => {
            setIsSidebarOpen(true);
            setSelectedMunicipalityCode(code);
          }}
        />
        <MapLabels features={guaricoJSON.features} />
        <MapActivities filters={filters} muncipalityCode={selectedMunicipalityCode} checkedIntitutions={checkedIntitutions} />
      </MapContainer>
    </>
  );
};


export const makeMarker = ({ institution }: { institution: Institution }) => {
  return L.icon({
    iconUrl: getSvgIconByAreaCode(institution.parent ? institution.parent.code : institution.code),
    iconSize: [30, 50],
    className: "map-marker-animation"
  });
}

export type ActivityCardData = { municipio_id: string, institution_id: string };

export type onProjectClickProps = {
  isOpen: boolean,
  municipio_id?: string,
  institution_id?: string
}

export default MapPage;
