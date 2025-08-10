import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TimelineEventForm from "../components/timeline/TimelineEventForm";
import LoadingSpinner from "../components/common/LoadingSpinner";

function EditTimelineEventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/timeline/${id}`);
        const data = await res.json();
        setEvent(data);
      } catch (err) {
        console.error("Failed to fetch timeline event:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleSave = async (updatedEvent) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`/api/timeline/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedEvent),
      });
    } catch (err) {
      console.error("Failed to update timeline event:", err);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="text-5xl font-semibold mb-10">Edit Timeline Event.</h1>
      <TimelineEventForm event={event} onSave={handleSave} />
    </div>
  );
}

export default EditTimelineEventPage;