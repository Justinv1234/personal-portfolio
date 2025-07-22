import { projectInfo } from "../../data/ProjectsData";
import { Link } from "react-router-dom";

function DisplayProjects({ featuredOnly }) {
  const slugify = (text) =>
    text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

  const filteredProjects = projectInfo.filter(
    (project) => project.isFeatured || !featuredOnly
  );

  return (
    <div className="px-8 mt-10">
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:text-left text-center">
        {filteredProjects.map((project, index) => (
          <Link to={`/projects/${slugify(project.title)}`} key={index}>
            <div className="rounded-xl border border-gray-700 bg-card text-card-foreground shadow flex flex-col md:w-auto hover:scale-[1.01] transition-transform">
              <div className="flex flex-col space-y-2.5 p-6">
                <img
                  className="border border-gray-600 h-40 w-full object-cover object-top"
                  src={project.websiteURL}
                  alt={`${project.title} image`}
                />
                <h1 className="text-xl font-bold">{project.title}</h1>
                <p className="text-xs text-gray-400">{project.description}</p>

                <div className="flex flex-wrap gap-1">
                  {project.tags.map((tag, i) => (
                    <div
                      key={i}
                      className="bg-gray-600 text-white text-[10px] px-1 py-0 rounded-md"
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}

export default DisplayProjects;
