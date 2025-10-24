'use client';

import React, { useContext, useState } from "react";
import Header from "./_components/Header";
import AuthProvider from "./_components/auth/AuthProvider";
import { TripContextType, TripDetailContext } from "./context/TripDetailContext";
import { TripInfo } from "./create-new-trip/_components/Chatbox";

function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [tripDetailInfo, setTripDetailInfo] = useState<TripInfo | null>(null);
  
  return (
    <AuthProvider>
      <TripDetailContext.Provider value={{ tripDetailInfo, setTripDetailInfo }}>
        <div>
          <Header />
          {children}
        </div>
      </TripDetailContext.Provider>
    </AuthProvider>
  );
}

export default Provider;

export const useTripDetail = (): TripContextType | undefined => {
  return useContext(TripDetailContext);
};