"use client";
import { type ProjectSelect } from "@/server/db/schema/project";
import { api } from "@/trpc/react";
import { type FC } from "react";

import ListCard from "./ListCard";

interface DragableListsManagerProps {
  project: ProjectSelect;
}

const DragableListsManager: FC<DragableListsManagerProps> = ({ project }) => {
  const { data } = api.list.getAll.useQuery({ projectId: project.id });

  return data?.map((list) => <ListCard key={list.id} list={list} />);
};

export default DragableListsManager;
