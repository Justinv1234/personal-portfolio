import ProjectForm from "../components/projects/ProjectForm";

function AddProjectPage() {
  const handleSave = async (project) => {
    try {
      const token = localStorage.getItem("token");
      await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(project),
      });
    } catch (err) {
      console.error("Failed to add project:", err);
    }
  };

  return (
    <div>
      <h1 className="text-5xl font-semibold mb-10">Add New Project.</h1>
      <ProjectForm onSave={handleSave} />
    </div>
  );
}

export default AddProjectPage;
