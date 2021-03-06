import { useState, useEffect } from "react";
import { Municipio, Parroquia } from "../models";
import { useAxios } from "./useAxios";

export function useParroaquias(municipio_id?: string): [Parroquia[], boolean] {
  const [parroquia, setParroquias] = useState<Parroquia[]>([]);
  const [loading, setLoading] = useState(false);
  const axios = useAxios();

  useEffect(() => {
    if (!municipio_id) return;
    setLoading(true);
    axios
      .get<Parroquia[]>("/parroquia", {
        params: {
          municipio_id,
        },
      })
      .then((resp) => setParroquias(resp.data))
      .catch((e) => setLoading(false))
      .finally(() => setLoading(false));
  }, [municipio_id]);
  return [parroquia, loading];
}
