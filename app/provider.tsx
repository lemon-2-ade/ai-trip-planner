import React from "react";
import Header from "./_components/Header";
import AuthProvider from "./_components/auth/AuthProvider";

function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <div>
        <Header />
        {children}
      </div>
    </AuthProvider>
  );
}

export default Provider;
