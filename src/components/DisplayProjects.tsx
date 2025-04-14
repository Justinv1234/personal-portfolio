import { projectInfo } from "../data/ProjectsData";

interface FeaturedProjectsProps {
  featuredOnly: boolean;
}

function DisplayProjects({ featuredOnly }: FeaturedProjectsProps) {
  const mappedProjects = projectInfo
    .filter((info) => info.isFeatured || !featuredOnly)
    .map((info, index) => (
      <div
        key={index}
        className="rounded-xl border border-gray-700 bg-card text-card-foreground shadow flex flex-col md:w-auto"
      >
        <div className="flex flex-col space-y-2.5 p-6">
          <img
            className="border border-gray-600 items-center h-40 w-full object-cover object-top"
            src={info.websiteURL}
            alt="Project Img."
            height={300}
            width={500}
          />
          <h1 className="text-xl font-bold">{info.title}</h1>
          <h3 className="text-xs text-gray-400">{info.description}</h3>

          <div className="flex flex-wrap gap-1">
            {info.tags.map((tag, index) => (
              <div
                key={index}
                className="inline-flex bg-gray-600 items-center rounded-md border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 px-1 py-0 text-[10px]"
              >
                {tag}
              </div>
            ))}
          </div>

          <div className="flex flex-row"></div>
        </div>
      </div>
    ));

  return (
    <div className="px-8 mt-10">
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:text-left text-center">
        {mappedProjects}
      </section>
    </div>
  );
}

export default DisplayProjects;
