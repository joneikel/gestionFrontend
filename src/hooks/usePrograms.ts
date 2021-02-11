import { useState, useEffect } from "react";
import { Program } from "../models";
import { useAxios } from "./useAxios";

export function usePrograms(institution_id?: string) : [Program[], boolean] {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(false);
  const axios = useAxios();

  useEffect(() => {
    setLoading(true);
    axios
      .get<Program[]>("/program", {
          params: {
              institution_id
          }
      })
      .then((resp) => setPrograms(resp.data))
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, [institution_id]);

  return [programs, loading];
}
