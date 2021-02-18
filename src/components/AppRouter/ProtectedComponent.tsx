import React from 'react'
import { Redirect } from 'react-router-dom';
import { useScopeProps } from '../../hooks/useScope'
import UserContainer from '../../unstated/UserContainer';

const ProtectedComponent = ({children, scope}: {children: JSX.Element, scope: useScopeProps}) => {
  const userState = UserContainer.useContainer()
  const permit =  userState.user?.scopes.includes(scope);
  if(permit) {
    return children;
  } else {
    return <Redirect to="/no-autorizado"></Redirect>
  }
}

export default ProtectedComponent;