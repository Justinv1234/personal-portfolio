import { useState } from "react";
import { useNavigate } from "react-router-dom";

function TimelineEventForm({ event: initialEvent, onSave }) {
  const [event, setEvent] = useState(
    initialEvent || {
      title: "",
      start_date: "",
      end_date: "",
      position: "",
      icon_path: "",
      description: [],
      event_type: "experience",
    }
  );
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const handleArrayChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value.split(",").map((item) => item.trim()) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(event);
    navigate("/admin/timeline");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={event.title}
          onChange={handleChange}
          className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1"
          required
        />
      </div>
      <div className="flex gap-4">
        <div className="w-1/2">
          <label htmlFor="start_date" className="block text-sm font-medium">
            Start Date
          </label>
          <input
            type="text"
            name="start_date"
            id="start_date"
            value={event.start_date}
            onChange={handleChange}
            className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1"
            required
          />
        </div>
        <div className="w-1/2">
          <label htmlFor="end_date" className="block text-sm font-medium">
            End Date (optional)
          </label>
          <input
            type="text"
            name="end_date"
            id="end_date"
            value={event.end_date || ""}
            onChange={handleChange}
            className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1"
          />
        </div>
      </div>
      <div>
        <label htmlFor="position" className="block text-sm font-medium">
          Position / Degree
        </label>
        <input
          type="text"
          name="position"
          id="position"
          value={event.position}
          onChange={handleChange}
          className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1"
        />
      </div>
      <div>
        <label htmlFor="icon_path" className="block text-sm font-medium">
          Icon URL
        </label>
        <input
          type="text"
          name="icon_path"
          id="icon_path"
          value={event.icon_path}
          onChange={handleChange}
          className="w-full h-9 rounded-md border border-input bg-transparent px-3 py-1"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium">
          Description (comma-separated)
        </label>
        <textarea
          name="description"
          id="description"
          value={event.description.join(", ")}
          onChange={handleArrayChange}
          className="w-full h-24 rounded-md border border-input bg-transparent px-3 py-1"
        />
      </div>
      <div>
        <label htmlFor="event_type" className="block text-sm font-medium">
          Type
        </label>
        <select
          name="event_type"
          id="event_type"
          value={event.event_type}
          onChange={handleChange}
          className="w-full h-9 rounded-md border border-input bg-gray-700 px-3 py-1"
        >
          <option value="experience">Experience</option>
          <option value="education">Education</option>
        </select>
      </div>
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={() => navigate("/admin/timeline")}
          className="bg-gray-600 rounded-md px-4 py-2 text-white hover:bg-gray-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-blue-400 rounded-md px-4 py-2 text-white hover:bg-blue-500"
        >
          Save Event
        </button>
      </div>
    </form>
  );
}

export default TimelineEventForm;
