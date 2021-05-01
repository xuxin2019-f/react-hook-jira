import React, { ReactNode } from "react";
import { AuthProvider } from "context/auth-context";
export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      {/* 这里发现报错，因为在定义AuthProvider没有指明要有children */}
      {children}
    </AuthProvider>
  );
};
