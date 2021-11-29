import { useState, useEffect } from "react";
import { Parroquia, Project } from "../models";
import { useAxios } from "./useAxios";
import { Presenter } from "./usePresenter";
import { Vertice } from "./useVertices";

export function useProposals(): [Proposal[], boolean] {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(false);
  const axios = useAxios();

  useEffect(() => {
    setLoading(true);
    axios
      .get<Proposal[]>("/proposals")
      .then((resp) => setProposals(resp.data))
      .catch((e) => setLoading(false))
      .finally(() => setLoading(false));
  }, []);
  return [proposals, loading];
}

export type Proposal = {
  id: string;
  title: string;
  number: number;
  lat: number;
  lng: number;
  vertices: Vertice;
  presenters?: Presenter;
  parroquias?: Parroquia;
  sector?: string;
};

export type People = {
  fullname: string;
  identification?: string;
  email?: string;
  phone?: string;
  address?: string;
};
