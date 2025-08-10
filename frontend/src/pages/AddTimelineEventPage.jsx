import TimelineEventForm from "../components/timeline/TimelineEventForm";

function AddTimelineEventPage() {
  const handleSave = async (event) => {
    try {
      const token = localStorage.getItem("token");
      await fetch("/api/timeline", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(event),
      });
    } catch (err) {
      console.error("Failed to add timeline event:", err);
    }
  };

  return (
    <div>
      <h1 className="text-5xl font-semibold mb-10">Add New Timeline Event.</h1>
      <TimelineEventForm onSave={handleSave} />
    </div>
  );
}

export default AddTimelineEventPage;
