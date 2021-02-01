import { useState, useEffect } from "react";
import { Program } from "../models";
import { useAxios } from "./useAxios";

export function usePrograms(institution?: string) : [Program[], boolean] {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(false);
  const axios = useAxios();

  useEffect(() => {
    setLoading(true);
    axios
      .get<Program[]>("/program/filter", {
          params: {
              institution
          }
      })
      .then((resp) => setPrograms(resp.data))
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, [institution]);

  return [programs, loading];
}
