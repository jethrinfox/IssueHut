import { type ListSelect } from "@/server/db/schema/lists";
import { PlusIcon } from "lucide-react";
import { type FC } from "react";

import { Button } from "../ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";

interface ListCardProps {
  list: ListSelect;
}

const ListCard: FC<ListCardProps> = ({ list }) => {
  const { name } = list;

  return (
    <Card className="flex h-80 h-full w-48 flex-col justify-between rounded-xl">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>

      <CardFooter className="flex-col gap-2">
        <Button variant="link">
          <PlusIcon />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ListCard;
