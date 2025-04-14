import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center bg-[#202020] text-white">
      <header className="sticky top-0 h-20 w-full backdrop-blur-md bg-[#202020]/80 z-50">
        <div className="max-w-[704px] w-full mx-auto px-4">
          <Navbar />
        </div>
      </header>

      <main className="flex flex-col gap-5 w-full max-w-[704px] px-4 flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
