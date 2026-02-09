"use client";

import { ReactNode } from "react";
import StoreProvider from "./StoreProvider";

const GlobalProvider = ({ children }: { children: ReactNode }) => {
  return (
    <StoreProvider>
      {children}
    </StoreProvider>
  );
};

export default GlobalProvider;
