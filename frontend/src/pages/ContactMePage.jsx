import { useState } from "react";

const ContactMePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="flex flex-col md:text-left text-center">
      <h1 className="text-5xl font-semibold mb-7">Contact Me.</h1>

      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 mb-7 px-8 md:px-0 md:space-x-2">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full md:w-1/2 h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full md:w-1/2 h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
      </div>

      <div className="m-8 md:m-0">
        <textarea
          placeholder="Leave feedback about the site, career opportunities or just say hello etc."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full h-24 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring mb-4"
        />
      </div>

      <div className="flex justify-center">
        <button
          className="bg-blue-400 rounded-md mt-4 w-11/12 md:w-full px-4 py-2 text-white"
          onClick={() => alert("This is a demo only. No action is taken.")}
        >
          Send Message
        </button>
      </div>
    </div>
  );
};

export default ContactMePage;
