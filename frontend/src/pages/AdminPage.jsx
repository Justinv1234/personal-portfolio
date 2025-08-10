import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminPage() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/projects");
      if (res.status === 401) {
        navigate("/login");
        return;
      }
      if (!res.ok) {
        throw new Error("Failed to fetch projects");
      }
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
        const res = await fetch(`http://localhost:3000/api/projects/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          navigate("/login");
          return;
        }

        if (!res.ok) {
          throw new Error("Failed to delete project");
        }

        fetchProjects();
      } catch (err) {
        console.error("Failed to delete project:", err);
      }
    }
  };

  return (
    <div className="flex flex-col md:text-left text-center">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-5xl font-semibold">Manage Projects.</h1>
        <Link to="/admin/projects/new">
          <button className="bg-blue-400 rounded-md px-4 py-2 text-white hover:bg-blue-500 transition-colors">
            Add Project
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <div
            key={project.id}
            className="rounded-xl border border-gray-700 bg-card text-card-foreground shadow p-6 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-bold">{project.title}</h2>
              <p className="text-xs text-gray-400 mt-2">
                {project.description}
              </p>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Link to={`/admin/projects/edit/${project.id}`}>
                <button className="bg-gray-600 rounded-md px-3 py-1 text-white text-sm hover:bg-gray-700 transition-colors">
                  Edit
                </button>
              </Link>
              <button
                onClick={() => handleDelete(project.id)}
                className="bg-red-500 rounded-md px-3 py-1 text-white text-sm hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPage;
