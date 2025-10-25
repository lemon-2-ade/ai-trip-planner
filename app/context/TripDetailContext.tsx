import React, { createContext } from "react";
import { TripInfo } from "../create-new-trip/_components/Chatbox";

export type TripContextType = {
  tripDetailInfo: TripInfo | null;
  setTripDetailInfo: React.Dispatch<React.SetStateAction<TripInfo | null>>;
};

export const TripDetailContext = createContext<TripContextType | undefined>(
  undefined
);
