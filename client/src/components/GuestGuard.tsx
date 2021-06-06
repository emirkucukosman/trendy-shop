import React from "react";
import { Redirect } from "react-router-dom";
import { useReduxSelector } from "src/app/hook";
import { selectIsAuthenticated } from "src/slices/authSlice";

type GuestGuardProps = {
  children: React.ReactNode;
};

const GuestGuard: React.FC<GuestGuardProps> = ({ children }) => {
  const isAuthenticated = useReduxSelector(selectIsAuthenticated);

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return <>{children}</>;
};

export default GuestGuard;
