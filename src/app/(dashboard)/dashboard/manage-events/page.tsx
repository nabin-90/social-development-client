
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

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

const ManageEventsPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<Event | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const tokenResponse = await fetch(
          "http://localhost:5000/api/auth/token",
          {
            method: "GET",
            credentials: "include",
          },
        );

        const tokenResult = await tokenResponse.json();

        if (!tokenResponse.ok || !tokenResult.token) {
          throw new Error("Please login to manage your events.");
        }

        const response = await fetch("http://localhost:5000/my-events", {
          headers: {
            Authorization: `Bearer ${tokenResult.token}`,
          },
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to load your events.");
        }

        setEvents(result.data ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyEvents();
  }, []);

  const formatDate = (date: string) => {
    return new Date(`${date}T00:00:00`).toLocaleDateString("en-BD", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleDeleteEvent = async () => {
    if (!deleteTarget) return;

    setDeleting(true);
    setError("");
    setSuccess("");

    try {
      const tokenResponse = await fetch(
        "http://localhost:5000/api/auth/token",
        {
          method: "GET",
          credentials: "include",
        },
      );

      const tokenResult = await tokenResponse.json();

      if (!tokenResponse.ok || !tokenResult.token) {
        throw new Error("Please login again.");
      }

      const response = await fetch(
        `http://localhost:5000/events/${deleteTarget._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${tokenResult.token}`,
          },
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete event.");
      }

      setEvents((currentEvents) =>
        currentEvents.filter((event) => event._id !== deleteTarget._id),
      );

      setSuccess("Event deleted successfully!");
      setDeleteTarget(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-gray-600">Loading your events...</p>
      </main>
    );
  }

  if (error && events.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <p role="alert" className="text-red-600">
          {error}
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="font-semibold text-green-600">EVENT MANAGEMENT</p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Manage Events
          </h1>

          <p className="mt-3 text-gray-600">
            View and manage the community events you created.
          </p>
        </div>

        {error && (
          <p role="alert" className="mb-5 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </p>
        )}

        {success && (
          <p role="status" className="mb-5 rounded-lg bg-green-50 p-3 text-sm text-green-700">
            {success}
          </p>
        )}

        {events.length === 0 ? (
          <div className="rounded-xl border bg-white p-10 text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              You haven&apos;t created any events yet
            </h2>

            <Link
              href="/dashboard/create-event"
              className="mt-5 inline-block rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
            >
              Create an Event
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <article
                key={event._id}
                className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm"
              >
                <Image
                  src={event.thumbnail}
                  alt={event.title}
                  width={1200}
                  height={600}
                  className="h-52 w-full object-cover"
                />

                <div className="p-5">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                    {event.type}
                  </span>

                  <h2 className="mt-4 text-xl font-bold text-gray-900">
                    {event.title}
                  </h2>

                  <p className="mt-2 text-sm text-gray-600">
                    📅 {formatDate(event.eventDate)}
                  </p>

                  <p className="mt-1 text-sm text-gray-600">
                    📍 {event.location}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <Link
                      href={`/events/${event._id}`}
                      className="font-semibold text-green-600 hover:underline"
                    >
                      View Details →
                    </Link>

                    <Link
                      href={`/dashboard/manage-events/${event._id}/edit`}
                      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      Update Event
                    </Link>

                    <button
                      type="button"
                      onClick={() => setDeleteTarget(event)}
                      className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                    >
                      Delete Event
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-dialog-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
          >
            <h2
              id="delete-dialog-title"
              className="text-xl font-bold text-gray-900"
            >
              Delete this event?
            </h2>

            <p className="mt-3 text-gray-600">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{deleteTarget.title}</span>?
              This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                disabled={deleting}
                onClick={() => setDeleteTarget(null)}
                className="rounded-lg border border-gray-300 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={deleting}
                onClick={handleDeleteEvent}
                className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ManageEventsPage;
