import { type ListSelect } from "@/server/db/schema/lists";
import { PlusIcon } from "lucide-react";
import { type FC, useState } from "react";

import AddIssueBlock from "../Issues/AddIssueBlock";
import IssuesListContainer from "../Issues/IssuesListContainer";
import { Button } from "../ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";

interface ListCardProps {
  list: ListSelect;
}

const ListCard: FC<ListCardProps> = ({ list }) => {
  const [isCreateIssueBlockOpen, setIsCreateIssueBlockOpen] = useState(false);
  const { name } = list;

  return (
    <Card className="flex max-h-full min-h-80 w-60 flex-col justify-between rounded-xl">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>

      <IssuesListContainer listId={list.id} />

      <CardFooter className="flex-col gap-2">
        {isCreateIssueBlockOpen ? (
          <AddIssueBlock
            listId={list.id}
            onClose={() => setIsCreateIssueBlockOpen(false)}
          />
        ) : (
          <Button
            onClick={() => setIsCreateIssueBlockOpen(true)}
            variant="link"
          >
            Add Issue
            <PlusIcon />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ListCard;
