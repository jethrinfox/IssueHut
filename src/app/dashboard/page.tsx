import DashboardPageContainer from "@/components/PageContainer/DashboardPageContainer";
import ProjectsContainer from "@/components/Projects/ProjectsContainer";
import Title from "@/components/Title";

export default async function DashboardPage() {
  return (
    <DashboardPageContainer>
      <Title>Projects</Title>
      <ProjectsContainer />
    </DashboardPageContainer>
  );
}
