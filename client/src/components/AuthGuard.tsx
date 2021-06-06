import React from "react";
import { Redirect } from "react-router-dom";
import { useReduxSelector } from "src/app/hook";
import { selectIsAuthenticated } from "src/slices/authSlice";

type AuthGuardProps = {
  children: React.ReactNode;
};

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const isAuthenticated = useReduxSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  return <>{children}</>;
};

export default AuthGuard;
