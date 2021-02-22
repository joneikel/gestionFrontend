import { useState } from 'react';
import { createContainer } from 'unstated-next';
import { useScopeProps } from '../hooks/useScope';
import { Institution, Role } from '../models';

function useUser() {
  let [user, setUser] = useState<User | undefined>(checkCurrentSession());
  let logout = () => {
    setUser(undefined);
    clearSessions();
  }
  let login = (payload: User) => {
    localStorage.setItem("user", JSON.stringify(payload));
    setUser(payload);
  };
  return { user, login, logout }
}

const UserContainer = createContainer(useUser);
export default UserContainer;

export type User = {
  name: string;
  access_token: string,
  scopes: useScopeProps[],
  institution: Institution,
  role: Role
}

function clearSessions(): void {
  localStorage.clear();
  sessionStorage.clear();
}

function checkCurrentSession(): User | undefined {
  const rawUser = localStorage.getItem("user");
  return rawUser ? JSON.parse(rawUser) : undefined;
}