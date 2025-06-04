import { type FC, type PropsWithChildren } from "react";

const DashboardPageContainer: FC<PropsWithChildren> = ({ children }) => {
  return <div className="flex flex-col flex-wrap">{children}</div>;
};

export default DashboardPageContainer;
