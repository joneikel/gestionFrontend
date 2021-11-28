import { useState, useEffect } from "react";
import { useAxios } from "./useAxios";

export function usePresenterType(): [PresenterType[], boolean] {
  const [presenterTypes, setPresenterType] = useState<PresenterType[]>([]);
  const [loading, setLoading] = useState(false);
  const axios = useAxios();

  useEffect(() => {
    setLoading(true);
    axios
      .get<PresenterType[]>("/presenter-type")
      .then((resp) => setPresenterType(resp.data))
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, []);

  return [presenterTypes, loading];
}

export type PresenterType = {
  id: string;
  name: string;
};
