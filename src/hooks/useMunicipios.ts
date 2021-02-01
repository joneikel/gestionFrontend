import { useState, useEffect } from "react";
import { Municipio } from "../models";
import { useAxios } from "./useAxios";

export function useMunicipios(): [Municipio[], boolean] {
  const [municipios, setMunicipios] = useState<Municipio[]>([]);
  const [loading, setLoading] = useState(false);
  const axios = useAxios();

  useEffect(() => {
    setLoading(true);
    axios
      .get<Municipio[]>("/municipio")
      .then((resp) => setMunicipios(resp.data))
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, []);

  return [municipios, loading];
}
