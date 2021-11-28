import { useState, useEffect } from "react";
import { useAxios } from "./useAxios";
import { PresenterType } from "./usePresenterType";

export function usePresenters(): [Presenter[], boolean] {
  const [presenters, setPresenters] = useState<Presenter[]>([]);
  const [loading, setLoading] = useState(false);
  const axios = useAxios();

  useEffect(() => {
    setLoading(true);
    axios
      .get<Presenter[]>("/presenter")
      .then((resp) => setPresenters(resp.data))
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, []);

  return [presenters, loading];
}

export type Presenter = {
  id: string;
  presenter_type_id: string;
  name: string;
  presenter_type?: PresenterType;
};
