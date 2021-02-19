import { useState, useEffect } from "react";
import { useAxios } from "./useAxios";
import { Module } from "../models";

export function useModules(): [Module[], boolean] {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(false);
  const axios = useAxios();

  useEffect(() => {
    setLoading(true);
    axios
      .get<Module[]>("/module")
      .then((resp) => setModules(resp.data))
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, []);

  return [modules, loading];
}