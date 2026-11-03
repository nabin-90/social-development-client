"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import EventCardSkeleton from "@/components/shared/EventCardSkeleton";
import EventCard, { type EventCardData } from "@/components/shared/EventCard";

type Event = EventCardData & {
  creatorEmail: string;
};

const ManageEventsPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<EventCardData | null>(null);
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
      <main className="min-h-screen bg-gray-50 px-4 py-12 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <div className="mb-3 h-4 w-36 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
            <div className="h-9 w-56 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
            <div className="mt-3 h-4 w-80 max-w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <EventCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (error && events.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-950">
        <p role="alert" className="text-red-600 dark:text-red-400">
          {error}
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="font-semibold text-green-600">EVENT MANAGEMENT</p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            Manage Events
          </h1>

          <p className="mt-3 text-gray-600 dark:text-gray-400">
            View and manage the community events you created.
          </p>
        </div>

        {error && (
          <p
            role="alert"
            className="mb-5 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/40 dark:text-red-400"
          >
            {error}
          </p>
        )}

        {success && (
          <p
            role="status"
            className="mb-5 rounded-lg bg-green-50 p-3 text-sm text-green-700 dark:bg-green-950/40 dark:text-green-400"
          >
            {success}
          </p>
        )}

        {events.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-10 text-center dark:border-gray-800 dark:bg-gray-900">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
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
              <EventCard
                key={event._id}
                event={event}
                updateHref={`/dashboard/manage-events/${event._id}/edit`}
                onDelete={(event) => setDeleteTarget(event)}
              />
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
            className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-gray-900"
          >
            <h2
              id="delete-dialog-title"
              className="text-xl font-bold text-gray-900 dark:text-white"
            >
              Delete this event?
            </h2>

            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {deleteTarget.title}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                disabled={deleting}
                onClick={() => setDeleteTarget(null)}
                className="rounded-lg border border-gray-300 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-60 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
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
