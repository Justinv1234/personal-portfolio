import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NotFound from "./NotFoundPage";

function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/projects/${slug}`);
        if (!res.ok) {
          setProject(null);
        } else {
          const data = await res.json();
          setProject(data);
        }
      } catch (err) {
        console.error("Failed to fetch project:", err);
        setProject(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!project) return <NotFound />;

  return (
    <div className="flex flex-col md:text-left text-center px-4">
      <h1 className="text-5xl font-semibold mb-10">{project.title}.</h1>
      {project.website_url && (
        <img
          src={project.website_url}
          alt="Project screenshot"
          className="rounded-lg border border-gray-700 mx-auto mb-5"
        />
      )}

      <h1 className="text-4xl font-semibold mb-3">Tech Stack.</h1>
      <div className="flex flex-wrap gap-2">
        {project.tags?.map((tag, i) => (
          <span
            key={i}
            className="bg-gray-600 text-white text-sm px-3 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <h1 className="text-4xl font-semibold mt-10 mb-3">Description.</h1>
      <p>{project.long_description}</p>
    </div>
  );
}

export default ProjectDetail;
