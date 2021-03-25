import { useEffect, useState } from "react";
import UserContainer from "../unstated/UserContainer";

export function useScope(scope: useScopeProps): boolean | undefined {
  const [permit, setPermit] = useState<boolean | undefined>(false);
  const { user } = UserContainer.useContainer();

  useEffect(() => {
    const scopes = user?.scopes;
    setPermit(scopes?.includes(scope));
  }, [scope, user]);
  return permit;
}

export type useScopeProps =
 |"users:menu"
 |"users:create"
 |"users:delete"
 |"users:update"
 |"users:read"
 |"institutions:menu"
 |"institutions:create"
 |"institutions:delete"
 |"institutions:update"
 |"institutions:read"
 |"programs:menu"
 |"programs:create"
 |"programs:delete"
 |"programs:update"
 |"programs:read"
 |"projects:menu"
 |"projects:create"
 |"projects:delete"
 |"projects:update"
 |"projects:read"
 |"activities:menu"
 |"activities:create"
 |"activities:delete"
 |"activities:update"
 |"activities:read"
 |"scopes:menu"
 |"scopes:create"
 |"scopes:delete"
 |"scopes:update"
 |"scopes:read"
 |"roles:menu"
 |"roles:create"
 |"roles:delete"
 |"roles:update"
 |"roles:read"
 |"modules:menu"
 |"modules:create"
 |"modules:delete"
 |"modules:update"
 |"modules:read"
 |"statistics:menu"
 |"statistics:create"
 |"statistics:delete"
 |"statistics:update"
 |"statistics:read"
 |"map:menu"
 |"map:read"
;
