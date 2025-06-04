import ListsContainer from "@/components/Lists/ListsContainer";
import DashboardPageContainer from "@/components/PageContainer/DashboardPageContainer";
import Title from "@/components/Title";
import { api } from "@/trpc/server";
import redirectAuth from "@/utils/auth/redirectAuth";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: Promise<{ projectId: string }> }) => {
  await redirectAuth();

  const { projectId } = await params;

  const project = await api.project.getOne({
    id: parseInt(projectId),
  });

  if (!project) {
    return redirect("/dashboard");
  }

  return (
    <DashboardPageContainer>
      <Title>{project.name}</Title>
      <ListsContainer project={project} />
    </DashboardPageContainer>
  );
};

export default Page;
