import { useState, useEffect } from "react";

function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  const [description, setDescription] = useState("");
  const [expID, setExpID] = useState("");
  const [uploadDescripMessage, setUploadDescripMessage] = useState("");

  const [expID2, setExpID2] = useState("");
  const [expType, setExpType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [title, setTitle] = useState("");
  const [position, setPosition] = useState("");
  const [iconPath, setIconPath] = useState("");
  const [uploadExperienceMessage, setUploadExperienceMessage] = useState("");

  const [experiences, setExperiences] = useState([]);
  const [selectedExperienceID, setSelectedExperienceID] = useState("");
  const [deleteExperienceMessage, setDeleteExperienceMessage] = useState("");

  const [
    selectedExperienceIDForDescription,
    setSelectedExperienceIDForDescription,
  ] = useState("");
  const [descriptionsForExperience, setDescriptionsForExperience] = useState(
    []
  );
  const [selectedDescriptionText, setSelectedDescriptionText] = useState("");
  const [deleteDescriptionMessage, setDeleteDescriptionMessage] = useState("");

  const [feedbackList, setFeedbackList] = useState<FeedbackEntry[]>([]);

  function fetchFeedbackMessages() {
    fetch(
      "https://3c3hpih46m4vefwbvzbequjgbm0kpexa.lambda-url.us-east-2.on.aws/"
    )
      .then((res) => res.json())
      .then((data) => setFeedbackList(data))
      .catch((err) => console.error("Error fetching feedback:", err));
  }

  useEffect(() => {
    fetchExperiences();
    fetchFeedbackMessages();
  }, []);

  if (!authenticated) {
    return (
      <div className="p-10 flex flex-col items-center gap-4">
        <h1 className="text-xl text-white">Enter Admin Password</h1>
        <input
          type="password"
          className="p-2 border rounded-md"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={async () => {
            try {
              const res = await fetch(
                "https://qxdctpav24rqd2rr7bohe62oda0rpmaw.lambda-url.us-east-2.on.aws/",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ password: passwordInput }),
                }
              );

              const data = await res.json();

              if (data.success) {
                setAuthenticated(true);
              } else {
                alert("Incorrect password");
              }
            } catch (err) {
              console.error("Failed to verify password:", err);
              alert("An error occurred");
            }
          }}
        >
          Unlock Admin
        </button>
      </div>
    );
  }

  function fetchExperiences() {
    fetch(
      "https://rk4tgmbkp4e3l34jz7cmkmjfaa0ihpue.lambda-url.us-east-2.on.aws/"
    )
      .then((res) => res.json())
      .then((data) => {
        setExperiences(data);
      })
      .catch((err) => console.error("Error fetching experiences:", err));
  }

  function fetchDescriptionsForExperience(expID: string) {
    fetch(
      `https://pakcprfklyymi7hmxe47xn3yju0ftxam.lambda-url.us-east-2.on.aws/?expID=${expID}`
    )
      .then((res) => res.json())
      .then((data) => {
        setDescriptionsForExperience(data);
      })
      .catch((err) => console.error("Error fetching descriptions:", err));
  }

  function handleUploadDescription() {
    fetch(
      "https://5rvsj2qmztt3xgoyjyhffrrpqe0izgeo.lambda-url.us-east-2.on.aws/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ expID, description }),
      }
    )
      .then(async (res) => {
        const text = await res.text();
        if (!res.ok) throw new Error(text);
        setUploadDescripMessage("Description uploaded successfully!");
      })
      .catch((err) => {
        console.error("Error uploading description:", err.message);
        setUploadDescripMessage(err.message);
      });
  }

  function handleUploadExperience() {
    fetch(
      "https://3k7vrqw777txo3zdaj6etagjg40ilgfq.lambda-url.us-east-2.on.aws/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          expID2,
          expType,
          startDate,
          endDate,
          title,
          position,
          iconPath,
        }),
      }
    )
      .then(async (res) => {
        const text = await res.text();
        if (!res.ok) throw new Error(text);
        setUploadExperienceMessage("Experience uploaded successfully!");
      })
      .catch((err) => {
        console.error("Error uploading experience:", err.message);
        setUploadExperienceMessage(err.message);
      });
  }

  function handleDeleteExperience() {
    fetch(
      "https://fh4kgayk3zu5kudasm5jq4qzha0ffcou.lambda-url.us-east-2.on.aws/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ expID: selectedExperienceID }),
      }
    )
      .then(async (res) => {
        const text = await res.text();
        if (!res.ok) throw new Error(text);
        setDeleteExperienceMessage("Experience deleted successfully!");
        fetchExperiences();
      })
      .catch((err) => {
        console.error("Error deleting experience:", err.message);
        setDeleteExperienceMessage(err.message);
      });
  }

  function handleDeleteSpecificDescription() {
    fetch(
      "https://gvtgyui7gmhhdcrg6m5graxkqm0npnis.lambda-url.us-east-2.on.aws/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          expID: selectedExperienceIDForDescription,
          description: selectedDescriptionText,
        }),
      }
    )
      .then(async (res) => {
        const text = await res.text();
        if (!res.ok) throw new Error(text);
        setDeleteDescriptionMessage("Description deleted successfully!");
        fetchDescriptionsForExperience(selectedExperienceIDForDescription);
      })
      .catch((err) => {
        console.error("Error deleting description:", err.message);
        setDeleteDescriptionMessage(err.message);
      });
  }

  interface FeedbackEntry {
    name: string;
    email: string;
    message: string;
  }

  return (
    <div className="flex flex-col md:text-left text-center gap-8 p-8">
      <h1 className="text-5xl font-semibold">Admin Page</h1>

      {/* Upload Description */}
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Upload Description</h2>
        <select
          className="p-2 border border-gray-400 rounded-md"
          value={expID}
          onChange={(e) => setExpID(e.target.value)}
        >
          <option value="">Select an Experience</option>
          {experiences.map((exp: any) => (
            <option key={exp.expID} value={exp.expID}>
              {exp.title} (ID: {exp.expID})
            </option>
          ))}
        </select>
        <input
          className="p-2 border border-gray-400 rounded-md"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description Text"
        />
        <button
          onClick={handleUploadDescription}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Upload Description
        </button>
        <h1 className="text-md text-gray-400">{uploadDescripMessage}</h1>
      </div>

      {/* Upload Experience */}
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Upload Experience</h2>
        <input
          className="p-2 border border-gray-400 rounded-md"
          value={expID2}
          onChange={(e) => setExpID2(e.target.value)}
          placeholder="ExpID"
        />
        <select
          className="p-2 border border-gray-400 rounded-md"
          value={expType}
          onChange={(e) => setExpType(e.target.value)}
        >
          <option value="">Select Type</option>
          <option value="experience">Experience</option>
          <option value="education">Education</option>
        </select>
        <input
          className="p-2 border border-gray-400 rounded-md"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          placeholder="Start Date (YYYY-MM-DD)"
        />
        <input
          className="p-2 border border-gray-400 rounded-md"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          placeholder="End Date (YYYY-MM-DD or blank)"
        />
        <input
          className="p-2 border border-gray-400 rounded-md"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <input
          className="p-2 border border-gray-400 rounded-md"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          placeholder="Position"
        />
        <input
          className="p-2 border border-gray-400 rounded-md"
          value={iconPath}
          onChange={(e) => setIconPath(e.target.value)}
          placeholder="Icon Path"
        />
        <button
          onClick={handleUploadExperience}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
        >
          Upload Experience
        </button>
        <h1 className="text-md text-gray-400">{uploadExperienceMessage}</h1>
      </div>

      {/* Delete Experience */}
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Delete Experience</h2>
        <select
          className="p-2 border rounded-md"
          value={selectedExperienceID}
          onChange={(e) => setSelectedExperienceID(e.target.value)}
        >
          <option value="">Select an Experience</option>
          {experiences.map((exp: any) => (
            <option key={exp.expID} value={exp.expID}>
              {exp.title} (ID: {exp.expID})
            </option>
          ))}
        </select>
        <button
          onClick={handleDeleteExperience}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          disabled={!selectedExperienceID}
        >
          Delete Experience
        </button>
        <h1 className="text-md text-gray-400">{deleteExperienceMessage}</h1>
      </div>

      {/* Delete Description */}
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">Delete Description</h2>
        <select
          className="p-2 border rounded-md"
          value={selectedExperienceIDForDescription}
          onChange={(e) => {
            const expID = e.target.value;
            setSelectedExperienceIDForDescription(expID);
            fetchDescriptionsForExperience(expID);
          }}
        >
          <option value="">Select an Experience</option>
          {experiences.map((exp: any) => (
            <option key={exp.expID} value={exp.expID}>
              {exp.title} (ID: {exp.expID})
            </option>
          ))}
        </select>

        <select
          className="p-2 border rounded-md"
          value={selectedDescriptionText}
          onChange={(e) => setSelectedDescriptionText(e.target.value)}
          disabled={!selectedExperienceIDForDescription}
        >
          <option value="">Select a Description</option>
          {descriptionsForExperience.map((desc: any) => (
            <option key={desc.text} value={desc.text}>
              {desc.text.slice(0, 50)}...
            </option>
          ))}
        </select>

        <button
          onClick={handleDeleteSpecificDescription}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          disabled={!selectedDescriptionText}
        >
          Delete Description
        </button>

        <h1 className="text-md text-gray-400">{deleteDescriptionMessage}</h1>
      </div>

      {/* 🆕 Feedback Messages Section */}
      <div className="flex flex-col gap-4 mt-12">
        <h2 className="text-2xl font-semibold">Feedback Messages</h2>

        {feedbackList.length === 0 ? (
          <p className="text-gray-400">No messages submitted yet.</p>
        ) : (
          <div className="flex flex-col gap-4 max-h-[600px] overflow-y-auto">
            {feedbackList.map((item, index) => (
              <div
                key={index}
                className="rounded-md p-4 shadow border border-gray-700 bg-[#202020] text-white"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-lg font-semibold text-blue-400">
                    {item.name}
                  </span>
                  <span className="text-sm text-gray-400">{item.email}</span>
                  <p className="mt-2 whitespace-pre-wrap text-gray-200">
                    {item.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;
