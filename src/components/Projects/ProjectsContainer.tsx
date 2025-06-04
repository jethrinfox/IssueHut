"use client";
import { api } from "@/trpc/react";
import { PlusIcon } from "lucide-react";
import { type FC, useState } from "react";

import { Button } from "../ui/button";
import { Card } from "../ui/card";
import AddProjectSheet from "./AddProjectSheet";
import ProjectCard from "./ProjectCard";

const ProjectsContainer: FC = () => {
  const { data } = api.project.getAll.useQuery();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
        {data?.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        <Card className="flex h-48 w-48 flex-col items-center justify-center rounded-xl">
          <Button
            aria-label="add project"
            onClick={() => setIsDrawerOpen(true)}
            variant="outline"
          >
            <PlusIcon />
          </Button>
        </Card>
      </div>
      <AddProjectSheet
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  );
};

export default ProjectsContainer;
