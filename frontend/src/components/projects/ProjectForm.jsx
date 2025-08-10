import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProjectForm({ project: initialProject, onSave }) {
  const [project, setProject] = useState(
    initialProject || {
      title: "",
      description: "",
      long_description: "",
      website_url: "",
      image_urls: [],
      tags: [],
      is_featured: false,
    }
  );
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProject({
      ...project,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleArrayChange = (e) => {
    const { name, value } = e.target;
    setProject({
      ...project,
      [name]: value.split(",").map((item) => item.trim()),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(project);
    navigate("/admin");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={project.title}
          onChange={handleChange}
          className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium">
          Short Description
        </label>
        <textarea
          name="description"
          id="description"
          value={project.description}
          onChange={handleChange}
          className="w-full h-24 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          required
        />
      </div>

      <div>
        <label htmlFor="long_description" className="block text-sm font-medium">
          Long Description
        </label>
        <textarea
          name="long_description"
          id="long_description"
          value={project.long_description}
          onChange={handleChange}
          className="w-full h-36 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          required
        />
      </div>

      <div>
        <label htmlFor="website_url" className="block text-sm font-medium">
          Website URL
        </label>
        <input
          type="text"
          name="website_url"
          id="website_url"
          value={project.website_url}
          onChange={handleChange}
          className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
      </div>

      <div>
        <label htmlFor="image_urls" className="block text-sm font-medium">
          Image URLs (comma-separated)
        </label>
        <input
          type="text"
          name="image_urls"
          id="image_urls"
          value={project.image_urls.join(", ")}
          onChange={handleArrayChange}
          className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium">
          Tags (comma-separated)
        </label>
        <input
          type="text"
          name="tags"
          id="tags"
          value={project.tags.join(", ")}
          onChange={handleArrayChange}
          className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          name="is_featured"
          id="is_featured"
          checked={project.is_featured}
          onChange={handleChange}
          className="h-4 w-4 rounded border-gray-300 text-blue-400 focus:ring-blue-400"
        />
        <label htmlFor="is_featured" className="ml-2 block text-sm">
          Featured Project
        </label>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => navigate("/admin")}
          className="bg-gray-600 rounded-md px-4 py-2 text-white hover:bg-gray-700 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-400 rounded-md px-4 py-2 text-white hover:bg-blue-500 transition-colors"
        >
          Save Project
        </button>
      </div>
    </form>
  );
}

export default ProjectForm;
