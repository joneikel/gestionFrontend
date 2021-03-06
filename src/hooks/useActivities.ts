import { useState, useEffect } from "react";
import { Activity } from "../models";
import { useAxios } from "./useAxios";

export function useActivities({
  project_id,
  institution_id,
  municipio_id,
  parroquia_id,
  gobernador,
  municipio_code,
  bulk_institution,
  bulk_municipios,
  conditition,
}: ActivityFiltersParams): [Activity[], boolean] {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(false);
  const axios = useAxios();

  useEffect(() => {
    if (!conditition) {
      setLoading(true);
      axios
        .get<Activity[]>("/activity", {
          params: {
            project_id,
            institution_id,
            municipio_id,
            parroquia_id,
            gobernador,
            municipio_code,
            bulk_institution,
            bulk_municipios,
          },
        })
        .then((resp) => setActivities(resp.data))
        .catch((e) => console.log(e))
        .finally(() => setLoading(false));
    }
  }, [
    project_id,
    institution_id,
    municipio_id,
    parroquia_id,
    gobernador,
    municipio_code,
    bulk_institution,
    bulk_municipios,
  ]);
  return [activities, loading];
}

export type ActivityFiltersParams = {
  project_id?: string;
  institution_id?: string;
  municipio_id?: string;
  parroquia_id?: string;
  gobernador?: string;
  municipio_code?: string;
  bulk_institution?: string[];
  bulk_municipios?: string[];
  conditition?: boolean;
};
