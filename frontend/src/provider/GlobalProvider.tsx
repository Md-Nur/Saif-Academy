import { ReactNode } from "react";
import AxiosProvider from "./AxiosProvider";
import TanstackProvider from "./TanstackProvider";
import StoreProvider from "./StoreProvider";

const GlobalProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AxiosProvider>
      <TanstackProvider>
        {/* <StoreProvider> */}
          {children}
          {/* </StoreProvider> */}
      </TanstackProvider>
    </AxiosProvider>
  );
};

export default GlobalProvider;
