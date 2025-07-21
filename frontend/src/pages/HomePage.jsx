import Introduction from "../components/home/Introduction";
import Socials from "../components/home/Socials";

function Home() {
  return (
    <main className="flex flex-col items-center gap-10 max-w-screen-md mx-auto px-4">
      <section className="flex flex-col items-center gap-5 md:flex-row-reverse md:items-center md:justify-center">
        <Introduction />
      </section>

      <Socials />
    </main>
  );
}

export default Home;
