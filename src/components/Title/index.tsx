import { type FC, type PropsWithChildren } from "react";

const Title: FC<PropsWithChildren> = ({ children }) => {
  return (
    <h1 className="mb-12 text-lg font-semibold md:text-2xl">{children}</h1>
  );
};

export default Title;
