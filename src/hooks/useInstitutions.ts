import { useState, useEffect } from "react";
import { Institution } from "../models";
import { useAxios } from "./useAxios";

export function useInstitutions(parentId?: string, onlyParent?: boolean) : [Institution[], boolean] {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loading, setLoading] = useState(false);
  const axios = useAxios();

  useEffect(() => {
    if(!onlyParent && !parentId) return;
    setLoading(true);
    axios
      .get<Institution[]>("/institutions-filtered", {
          params: {
              onlyParent: onlyParent ? 'ejecutiva' : parentId,
          }
      })
      .then((resp) => setInstitutions(resp.data))
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, [parentId]);

  return [institutions, loading];
}
