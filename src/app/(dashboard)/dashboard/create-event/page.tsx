
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const EVENT_TYPES = [
  "Cleanup",
  "Plantation",
  "Donation",
  "Education",
  "Health",
  "Community Support",
];

const CreateEventPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleCreateEvent = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const formElement = e.currentTarget;

    setError("");
    setSuccess("");

    const formData = new FormData(e.currentTarget);

    const eventData = {
      title: formData.get("title"),
      description: formData.get("description"),
      type: formData.get("type"),
      thumbnail: formData.get("thumbnail"),
      location: formData.get("location"),
      eventDate: formData.get("eventDate"),
    };

    setLoading(true);

    try {
      // Get JWT token from Better Auth
      const tokenResponse = await fetch(
        "http://localhost:5000/api/auth/token",
        {
          method: "GET",
          credentials: "include",
        }
      );

      const tokenResult = await tokenResponse.json();

      if (!tokenResponse.ok || !tokenResult.token) {
        throw new Error("Authentication token not found. Please login again.");
      }

      // Send event data to Express backend
      const response = await fetch("http://localhost:5000/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenResult.token}`,
        },
        body: JSON.stringify(eventData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create event.");
      }

      setSuccess("Event created successfully!");

      formElement.reset();

      setTimeout(() => {
        router.push("/upcoming-events");
        router.refresh();
      }, 1500);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <p className="font-semibold text-green-600">
            CREATE AN EVENT
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Organize a Community Event
          </h1>

          <p className="mt-3 text-gray-600">
            Bring people together and make a positive difference.
          </p>
        </div>

        <form
          onSubmit={handleCreateEvent}
          className="space-y-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8"
        >
          <div>
            <label htmlFor="title" className="mb-2 block font-medium text-gray-700">
              Event Title
            </label>

            <input
              id="title"
              name="title"
              type="text"
              minLength={3}
              placeholder="Enter event title"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
          </div>

          <div>
            <label htmlFor="description" className="mb-2 block font-medium text-gray-700">
              Description
            </label>

            <textarea
              id="description"
              name="description"
              rows={4}
              minLength={10}
              placeholder="Describe your event..."
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
          </div>

          <div>
            <label htmlFor="type" className="mb-2 block font-medium text-gray-700">
              Event Type
            </label>

            <select
              id="type"
              name="type"
              required
              defaultValue=""
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-600"
            >
              <option value="" disabled>
                Select event type
              </option>

              {EVENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="thumbnail" className="mb-2 block font-medium text-gray-700">
              Thumbnail Image URL
            </label>

            <input
              id="thumbnail"
              name="thumbnail"
              type="url"
              placeholder="https://example.com/image.jpg"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
            />
          </div>

          <div>
            <label htmlFor="location" className="mb-2 block font-medium text-gray-700">
              Location
            </label>

            <input
              id="location"
              name="location"
              type="text"
              placeholder="Enter event location"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
            />
          </div>

          <div>
            <label htmlFor="eventDate" className="mb-2 block font-medium text-gray-700">
              Event Date
            </label>

            <input
              id="eventDate"
              name="eventDate"
              type="date"
              min={new Date().toLocaleDateString("en-CA", {
                timeZone: "Asia/Dhaka",
              })}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-600"
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
            disabled={loading}
            className="w-full rounded-lg bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating Event..." : "Create Event"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default CreateEventPage;
