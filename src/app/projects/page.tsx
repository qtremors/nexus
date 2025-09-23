import Projects from "@/components/Projects";
import { getProjects } from "@/app/actions";

export default async function ProjectsPage() {
  const initialProjects = await getProjects();

  return (
    <main>
      <Projects initialProjects={initialProjects} />
    </main>
  );
}