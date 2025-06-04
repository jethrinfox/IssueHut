import { type IssueSelect } from "@/server/db/schema/issues";
import { type FC } from "react";

import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";

interface IssueCardProps {
  issue: IssueSelect;
}

const IssueCard: FC<IssueCardProps> = ({ issue }) => {
  const { description, name } = issue;

  return (
    <Card className="mx-1 mb-2">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>

      <CardFooter>{description}</CardFooter>
    </Card>
  );
};

export default IssueCard;
