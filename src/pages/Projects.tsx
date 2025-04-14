import DisplayProjects from "../components/DisplayProjects";

function Projects() {
  return (
    <div className="flex flex-col md:text-left text-center">
      <h1 className="text-5xl font-semibold">My Projects.</h1>
      <DisplayProjects featuredOnly={false} />
    </div>
  );
}

export default Projects;
