"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Event {
  _id: string;
  title: string;
  description: string;
  type: string;
  thumbnail: string;
  location: string;
  eventDate: string;
  creatorEmail: string;
}

const EditEventPage = () => {
  const params = useParams<{ id: string }>();
  const eventId = params.id;

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/events/${eventId}`
        );

        const result = await response.json();

        if (!response.ok || !result.success || !result.data) {
          throw new Error(result.message || "Event not found.");
        }

        setEvent(result.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-gray-600">Loading event...</p>
      </main>
    );
  }

  if (error || !event) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <p role="alert" className="text-red-600">
          {error || "Event not found."}
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <p className="font-semibold text-green-600">UPDATE EVENT</p>

        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          Edit: {event.title}
        </h1>

        <div className="mt-6 rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-gray-700">
            Event data loaded successfully.
          </p>

          <p className="mt-3 text-sm text-gray-600">
            Event ID: {event._id}
          </p>

          <p className="mt-2 text-sm text-gray-600">
            Event Date: {event.eventDate}
          </p>
        </div>
      </div>
    </main>
  );
};

export default EditEventPage;