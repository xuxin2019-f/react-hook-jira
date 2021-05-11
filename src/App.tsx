import React from "react";
import "./App.css";
import { useAuth } from "context/auth-context";
import { AuthenticatedApp } from "authenticated-app";
import { UnauthenticatedApp } from "unauthenticated-app/index";
import { ErrorBoundary } from "components/error-boundary";
import { FullPageError } from "components/lib";
function App() {
  const { user } = useAuth();
  return (
    <ErrorBoundary fallbackRender={FullPageError}>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </ErrorBoundary>
  );
}
export default App;
