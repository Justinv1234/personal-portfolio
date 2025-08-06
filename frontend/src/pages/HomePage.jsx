import Introduction from "../components/home/Introduction";
import Socials from "../components/home/Socials";
import Timeline from "../components/home/Timeline"
import DisplayProjects from "../components/projects/DisplayProjects";

function HomePage() {
  return (
    <main className="flex flex-col items-center gap-10 max-w-screen-md mx-auto px-4">
      <section className="flex flex-col items-center gap-5 md:flex-row-reverse md:items-center md:justify-center">
        <Introduction />
      </section>

      <Socials />

      <section className="flex flex-col items-center md:justify-center max-w-screen-md mt-5 px-8">
        <Timeline />
      </section>

      <section className="flex flex-col max-w-screen-md">
        <h1 className="text-2xl text-center sm:text-3xl  sm:text-left">
          Featured Projects.
        </h1>
        <DisplayProjects featuredOnly={false} />
      </section>
    </main>
  );
}

export default HomePage;
