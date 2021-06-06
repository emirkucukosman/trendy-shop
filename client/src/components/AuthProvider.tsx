import React, { useEffect } from "react";
import { useReduxDispatch, useReduxSelector } from "src/app/hook";
import { initialise, selectIsInitialised } from "src/slices/authSlice";
import LoadingScreen from "./LoadingScreen";

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useReduxDispatch();
  const isInitialised = useReduxSelector(selectIsInitialised);

  useEffect(() => {
    dispatch(initialise());
  }, [dispatch]);

  if (!isInitialised) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
};

export default AuthProvider;
