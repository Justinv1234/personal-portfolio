import { Link } from "react-router-dom";

const links = [
  { href: "/", label: "home" },
  { href: "/projects", label: "projects" },
  { href: "/contact-me", label: "contact" },
];

function Navbar() {
  return (
    <ul className="flex justify-start items-center h-20 pl-6 md:pl-0 space-x-4 md:space-x-7">
      {links.map((link) => (
        <li key={link.href}>
          <Link className="opacity-75 hover:opacity-100" to={link.href}>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default Navbar;
