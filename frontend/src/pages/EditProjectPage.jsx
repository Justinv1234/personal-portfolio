import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProjectForm from "../components/projects/ProjectForm";
import LoadingSpinner from "../components/common/LoadingSpinner";

function EditProjectPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/projects`);
        const projects = await res.json();
        const projectToEdit = projects.find((p) => p.id === parseInt(id));
        setProject(projectToEdit);
      } catch (err) {
        console.error("Failed to fetch project:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleSave = async (updatedProject) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedProject),
      });
    } catch (err) {
      console.error("Failed to update project:", err);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="text-5xl font-semibold mb-10">Edit Project.</h1>
      <ProjectForm project={project} onSave={handleSave} />
    </div>
  );
}

export default EditProjectPage;
