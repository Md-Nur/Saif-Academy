import { ReactNode } from "react";

const Title = ({ children }: { children: ReactNode }) => {
  return (
    <h1 className="text-3xl md:text-5xl font-bold text-center my-10">
      {children}
    </h1>
  );
};

export default Title;
