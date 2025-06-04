import { api } from "@/trpc/react";
import { type FC } from "react";

import IssueCard from "./IssueCard";

interface IssuesListContainerProps {
  listId: number;
}

const IssuesListContainer: FC<IssuesListContainerProps> = ({ listId }) => {
  const { data } = api.issue.getAll.useQuery({ listId });

  return (
    <div className="mb-4 flex-1">
      {data?.map((issue) => <IssueCard issue={issue} key={issue.id} />)}
    </div>
  );
};

export default IssuesListContainer;
