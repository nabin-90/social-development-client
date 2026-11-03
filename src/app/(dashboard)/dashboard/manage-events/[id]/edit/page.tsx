"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const EVENT_TYPES = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Education",
  "Health",
  "Community Support",
];

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
  const router = useRouter();

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/events/${eventId}`
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

  const handleUpdateEvent = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const formElement = e.currentTarget;

    setError("");
    setSuccess("");

    const formData = new FormData(formElement);

    const eventData = {
      title: formData.get("title"),
      description: formData.get("description"),
      type: formData.get("type"),
      thumbnail: formData.get("thumbnail"),
      location: formData.get("location"),
      eventDate: formData.get("eventDate"),
    };

    setUpdating(true);

    try {
      const tokenResponse = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/auth/token`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const tokenResult = await tokenResponse.json();

      if (!tokenResponse.ok || !tokenResult.token) {
        throw new Error("Please login again.");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/events/${eventId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenResult.token}`,
          },
          body: JSON.stringify(eventData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to update event.");
      }

      setSuccess("Event updated successfully!");

      setTimeout(() => {
        router.push("/dashboard/manage-events");
        router.refresh();
      }, 1500);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-gray-600">Loading event...</p>
      </main>
    );
  }

  if (error && !event) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <p role="alert" className="text-red-600">
          {error}
        </p>
      </main>
    );
  }

  if (!event) return null;

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12 dark:bg-gray-950">
      <div className="mx-auto max-w-3xl">
        <p className="font-semibold text-green-600">UPDATE EVENT</p>

        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          Edit Event
        </h1>

        <p className="mt-3 text-gray-600">
          Update the details of your community event.
        </p>

        <form
          onSubmit={handleUpdateEvent}
          className="mt-8 space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 dark:border-gray-800 dark:bg-gray-900"
        >
          <div>
            <label
              htmlFor="title"
              className="mb-2 block font-medium text-gray-700"
            >
              Event Title
            </label>

            <input
              id="title"
              name="title"
              type="text"
              defaultValue={event.title}
              minLength={3}
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-green-500 dark:focus:ring-green-900"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-2 block font-medium text-gray-700"
            >
              Description
            </label>

            <textarea
              id="description"
              name="description"
              rows={4}
              defaultValue={event.description}
              minLength={10}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            />
          </div>

          <div>
            <label
              htmlFor="type"
              className="mb-2 block font-medium text-gray-700"
            >
              Event Type
            </label>

            <select
              id="type"
              name="type"
              defaultValue={event.type}
              required
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:[color-scheme:dark]"
            >
              {EVENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="thumbnail"
              className="mb-2 block font-medium text-gray-700"
            >
              Thumbnail Image URL
            </label>

            <input
              id="thumbnail"
              name="thumbnail"
              type="url"
              defaultValue={event.thumbnail}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            />
          </div>

          <div>
            <label
              htmlFor="location"
              className="mb-2 block font-medium text-gray-700"
            >
              Location
            </label>

            <input
              id="location"
              name="location"
              type="text"
              defaultValue={event.location}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            />
          </div>

          <div>
            <label
              htmlFor="eventDate"
              className="mb-2 block font-medium text-gray-700"
            >
              Event Date
            </label>

            <input
              id="eventDate"
              name="eventDate"
              type="date"
              defaultValue={event.eventDate}
              min={new Date().toLocaleDateString("en-CA", {
                timeZone: "Asia/Dhaka",
              })}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            />
          </div>

          {error && (
            <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </p>
          )}

          {success && (
            <p role="status" className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={updating}
            className="w-full rounded-lg bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {updating ? "Updating Event..." : "Save Changes"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default EditEventPage;