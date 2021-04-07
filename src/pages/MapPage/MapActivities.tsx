import { Spin } from "antd";
import { AxiosInstance } from "axios";
import { useEffect, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { ActivityCardData, makeMarker } from ".";
import { useAxios } from "../../hooks/useAxios";
import { Activity } from "../../models";
import ActivityCards from "../ActivityPage/components/ActivityCards";
import { MapFiltersOpts } from "./MapFilters";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";

const createClusterCustomIcon = function (cluster: any) {
  return L.divIcon({
    html: `<span>${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: L.point(33, 33, true),
  });
};

const MapActivities = ({
  muncipalityCode,
  checkedIntitutions,
  filters,
}: MapActivitiesProps) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(false);
  const axios = useAxios();

  useEffect(() => {
    setLoading(true);
    getActivitiesByInstitutionMunicipio(
      checkedIntitutions.map((ci) => ci.institution_id),
      checkedIntitutions.map((ci) => ci.municipio_id),
      axios,
      filters
    )
      .then((act) => setActivities(act))
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, [checkedIntitutions, filters]);

  return (
    <>
      {loading && (
        <Spin size="large" className="loading-map-activities-spinner" />
      )}
      <MarkerClusterGroup iconCreateFunction={createClusterCustomIcon}>
        {activities
          .filter(
            (act) =>
              act.lat &&
              act.lng &&
              act.parroquia.municipio.code === muncipalityCode
          )
          .map((act, i) => {
            return (
              act.lat &&
              act.lng && (
                <Marker
                  icon={makeMarker({
                    institution: act.project.program.institution,
                  })}
                  position={{ lat: act.lat, lng: act.lng }}
                >
                  <Popup>
                    <ActivityCards activity={act} i={i} />
                  </Popup>
                </Marker>
              )
            );
          })}
      </MarkerClusterGroup>
    </>
  );
};

export default MapActivities;

type MapActivitiesProps = {
  muncipalityCode?: string;
  checkedIntitutions: ActivityCardData[];
  filters?: MapFiltersOpts;
};

async function getActivitiesByInstitutionMunicipio(
  bulk_institution: string[],
  bulk_municipios: string[],
  axios: AxiosInstance,
  filters?: any
) {
  if (bulk_institution.length > 0 && bulk_municipios.length > 0) {
    const response = await axios.get("/activity", {
      params: {
        bulk_institution,
        bulk_municipios,
        ...filters,
      },
    });
    return response.data;
  }
  return [];
}
