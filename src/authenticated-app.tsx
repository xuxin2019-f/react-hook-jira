import React from "react";
import { useAuth } from "context/auth-context";
import { ProjectListSreen } from "screens/project-list/index";
export const AuthenticatedApp = () => {
  const { logout } = useAutn();
  return (
    <div>
      <button onClick={logout}>登出</button>
      <ProjectListSreen />
    </div>
  );
};
