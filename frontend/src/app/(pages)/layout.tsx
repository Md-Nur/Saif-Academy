import { ReactNode } from "react";

const Pages = ({ children }: { children: ReactNode }) => {
  return (
    <main className="min-h-[calc(100vh-192px)] flex justify-center items-center flex-col w-full">
      {children}
    </main>
  );
};

export default Pages;
