"use client";
import { type ProjectSelect } from "@/server/db/schema/project";
import { PlusIcon } from "lucide-react";
import { type FC, useState } from "react";

import { Button } from "../ui/button";
import { Card } from "../ui/card";
import AddListSheet from "./AddListSheet";
import DragableListsManager from "./DragableListsManager";

interface ListsContainerProps {
  project: ProjectSelect;
}

const ListsContainer: FC<ListsContainerProps> = ({ project }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
        <DragableListsManager project={project} />

        <Card className="flex h-80 w-60 flex-col items-center justify-center rounded-xl">
          <Button
            aria-label="add list"
            onClick={() => setIsDrawerOpen(true)}
            variant="outline"
          >
            <PlusIcon />
          </Button>
        </Card>
      </div>
      <AddListSheet
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        projectId={project.id}
      />
    </>
  );
};

export default ListsContainer;
