import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminPage() {
  const [projects, setProjects] = useState([]);
  const [timelineEvents, setTimelineEvents] = useState([]);
  const navigate = useNavigate();

  // Fetch Projects
  const fetchProjects = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/projects");
      if (res.status === 401) return navigate("/login");
      if (!res.ok) throw new Error("Failed to fetch projects");
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch Timeline Events
  const fetchTimelineEvents = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/timeline");
      if (res.status === 401) return navigate("/login");
      if (!res.ok) throw new Error("Failed to fetch timeline events");
      const data = await res.json();
      setTimelineEvents(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchTimelineEvents();
  }, []);

  // Handlers for Deleting Projects
  const handleProjectDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      const token = localStorage.getItem("token");
      try {
        await fetch(`http://localhost:3000/api/projects/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchProjects(); // Refresh list
      } catch (err) {
        console.error("Failed to delete project:", err);
      }
    }
  };

  // Handlers for Deleting Timeline Events
  const handleTimelineDelete = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this timeline event?")
    ) {
      const token = localStorage.getItem("token");
      try {
        await fetch(`http://localhost:3000/api/timeline/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchTimelineEvents(); // Refresh list
      } catch (err) {
        console.error("Failed to delete timeline event:", err);
      }
    }
  };

  return (
    <div className="flex flex-col gap-12">
      {/* Projects Section */}
      <section>
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-semibold">Manage Projects.</h1>
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
              className="rounded-xl border border-gray-700 p-6 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-bold">{project.title}</h2>
                <p className="text-xs text-gray-400 mt-2">
                  {project.description}
                </p>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Link to={`/admin/projects/edit/${project.id}`}>
                  <button className="bg-gray-600 rounded-md px-3 py-1 text-white text-sm hover:bg-gray-700">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => handleProjectDelete(project.id)}
                  className="bg-red-500 rounded-md px-3 py-1 text-white text-sm hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section>
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-semibold">Manage Timeline.</h1>
          <Link to="/admin/timeline/new">
            <button className="bg-blue-400 rounded-md px-4 py-2 text-white hover:bg-blue-500 transition-colors">
              Add Event
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {timelineEvents.map((event) => (
            <div
              key={event.id}
              className="rounded-xl border border-gray-700 p-6 flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-bold">{event.title}</h2>
                <p className="text-xs text-gray-400 mt-2 capitalize">
                  {event.position} ({event.event_type})
                </p>
              </div>
              <div className="flex gap-2">
                <Link to={`/admin/timeline/edit/${event.id}`}>
                  <button className="bg-gray-600 rounded-md px-3 py-1 text-white text-sm hover:bg-gray-700">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => handleTimelineDelete(event.id)}
                  className="bg-red-500 rounded-md px-3 py-1 text-white text-sm hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AdminPage;
