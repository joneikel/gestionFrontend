import { useState } from 'react';
import { createContainer } from 'unstated-next';

function useUser() {
  let [user, setUser] = useState<User | undefined>(checkCurrentSession());
  let logout = () => {
    setUser(undefined);
    clearSessions();
  }
  let login = (payload: User) => {
    sessionStorage.setItem("user", JSON.stringify(payload));
    setUser(payload);
  };
  return { user, login, logout }
}

const UserContainer = createContainer(useUser);
export default UserContainer;

export type User = {
  name: string;
  access_token: string,
}

function clearSessions(): void {
  localStorage.clear();
  sessionStorage.clear();
}

function checkCurrentSession(): User | undefined {
  const rawUser = localStorage.getItem("user");
  return rawUser ? JSON.parse(rawUser) : undefined;
}