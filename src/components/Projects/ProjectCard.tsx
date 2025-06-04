import { type ProjectSelect } from "@/server/db/schema/project";
import { Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { type FC } from "react";

import { Button } from "../ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface ProjectCardProps {
  project: ProjectSelect;
}

const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
  const { description, id, name } = project;

  return (
    <Card className="h-48 w-48 rounded-xl">
      <Link href={`/dashboard/board/${id}`}>
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription>
            {description ?? "No description provided."}
          </CardDescription>
        </CardHeader>

        <CardFooter className="flex-col gap-2">
          <Button variant="link">
            <LinkIcon className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default ProjectCard;
