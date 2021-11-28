import { useState, useEffect } from "react";
import { useAxios } from "./useAxios";

export function useVertices(): [Vertice[], boolean] {
  const [vertices, setVertices] = useState<Vertice[]>([]);
  const [loading, setLoading] = useState(false);
  const axios = useAxios();

  useEffect(() => {
    setLoading(true);
    axios
      .get<Vertice[]>("/vertices")
      .then((resp) => setVertices(resp.data))
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, []);

  return [vertices, loading];
}

export type Vertice = {
  id: string;
  number: number;
  name: string;
  code_name: string;
  color: string;
};
