import meImage from "../../assets/images/me.png";

function Introduction() {
  return (
    <>
      <img
        className="rounded-lg mt-16"
        src={meImage}
        alt="Justin Veltri img."
        width={175}
        height={175}
      />
      <div className="flex flex-col text-center md:text-left w-11/12">
        <h1 className="text-5xl font-semibold">Hi, Justin here 👋</h1>
        <p className="mt-4 font-light">
          {new Date().getFullYear() - 2005}
          -year-old computer scientist major studying at Monmouth University
        </p>
        <p className="mt-2 font-light">
          My focus is in fullstack application development where I work
          primarily with React, Node.js, and SQL.
        </p>
        <p className="mt-2 font-light">
          I am currently persuing my minor in both Cybersecurity and
          Mathematics.
        </p>
      </div>
    </>
  );
}

export default Introduction;
