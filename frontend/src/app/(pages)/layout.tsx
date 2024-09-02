import { ReactNode } from "react";

const Pages = ({ children }: { children: ReactNode }) => {
  return (
    <main
      className="min-h-[calc(100vh-192px)] flex justify-center
     items-center flex-col w-full max-w-7xl mx-auto"
    >
      {children}
    </main>
  );
};

export default Pages;
