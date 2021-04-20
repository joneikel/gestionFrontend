import { useState, useEffect } from "react";
import { User } from "../unstated/UserContainer";
import { useAxios } from "./useAxios";

export function useUsers(): [User[], boolean] {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const axios = useAxios();

  useEffect(() => {
    setLoading(true);
    axios
      .get<User[]>("/user")
      .then((resp) => setUsers(resp.data))
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, []);

  return [users, loading];
}
