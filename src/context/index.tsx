import React, { ReactNode } from "react";
import { AuthProvider } from "context/auth-context";
import { QueryClient, QueryClientProvider } from "react-query";
export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <AuthProvider>
        {/* 这里发现报错，因为在定义AuthProvider没有指明要有children */}
        {children}
      </AuthProvider>
    </QueryClientProvider>
  );
};
