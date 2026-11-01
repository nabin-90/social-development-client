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

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-gray-600">Loading your events...</p>
      </main>
    );
  }

  if (error) {
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

                  <Link
                    href={`/events/${event._id}`}
                    className="mt-5 inline-block font-semibold text-green-600 hover:underline"
                  >
                    View Details →
                  </Link>
                  <Link
                    href={`/dashboard/manage-events/${event._id}/edit`}
                    className="mt-3 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    Update Event
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default ManageEventsPage;
