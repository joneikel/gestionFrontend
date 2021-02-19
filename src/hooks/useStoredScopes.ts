import { useState, useEffect } from "react";
import { useAxios } from "./useAxios";
import { Scope } from "../models";

export function useStoredScopes(): [Scope[], boolean] {
  const [scopes, setScopes] = useState<Scope[]>([]);
  const [loading, setLoading] = useState(false);
  const axios = useAxios();

  useEffect(() => {
    setLoading(true);
    axios
      .get<Scope[]>("/scope")
      .then((resp) => setScopes(resp.data))
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, []);

  return [scopes, loading];
}