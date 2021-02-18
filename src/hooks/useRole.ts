import { useState, useEffect } from "react";
import { Role } from "../models";
import { useAxios } from "./useAxios";

export function useRole(): [Role[], boolean] {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const axios = useAxios();

  useEffect(() => {
    setLoading(true);
    axios
      .get<Role[]>("/role")
      .then((resp) => setRoles(resp.data))
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, []);

  return [roles, loading];
}