import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center text-center flex-grow h-full mt-20">
      <h1 className="text-8xl font-bold text-violet-400">404</h1>
      <h2 className="text-4xl font-semibold mt-4">Page Not Found.</h2>
      <p className="text-gray-400 mt-2">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to="/">
        <button className="bg-blue-400 rounded-md mt-8 px-6 py-2 text-white hover:bg-blue-500 transition-colors">
          Go back home
        </button>
      </Link>
    </div>
  );
}

export default NotFoundPage;
