import { useParams } from "react-router-dom";
import { projectInfo } from "../data/ProjectsData";
import NotFound from "./NotFoundPage";

function ProjectDetail() {
  const { slug } = useParams();

  const slugify = (text) =>
    text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

  const project = projectInfo.find((p) => slugify(p.title) === slug);

  if (!project) {
    return <NotFound />;
  }

  return (
    <div className="px-8 mt-10 max-w-3xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
      <img
        src={project.websiteURL}
        alt="Project screenshot"
        className="rounded-lg border border-gray-700 mx-auto mb-6"
      />
      <p className="text-gray-300 mb-4">{project.description}</p>
      <div className="flex flex-wrap justify-center gap-2">
        {project.tags.map((tag, i) => (
          <span
            key={i}
            className="bg-gray-600 text-white text-sm px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ProjectDetail;
