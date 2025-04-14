import Timeline from "../components/Timeline.tsx";
import Socials from "../components/Socials.tsx";
import Introduction from "../components/Introduction.tsx";
import DisplayProjects from "../components/DisplayProjects.tsx";

function Home() {
  return (
    <>
      <section className="flex flex-col items-center gap-5 md:flex-row-reverse md:items-center md:justify-center max-w-screen-md">
        <Introduction />
      </section>

      <Socials />

      <section className="flex flex-col items-center md:justify-center max-w-screen-md mt-5 px-8">
        <Timeline />
      </section>

      <section className="flex flex-col max-w-screen-md">
        <h1 className="text-2xl text-center sm:text-3xl  sm:text-left">
          Featured Projects
        </h1>
        <DisplayProjects featuredOnly={true} />
      </section>
    </>
  );
}

export default Home;
