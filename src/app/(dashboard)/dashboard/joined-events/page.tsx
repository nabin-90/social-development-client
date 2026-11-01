"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import EventCardSkeleton from "@/components/shared/EventCardSkeleton";

interface JoinedEvent {
  _id: string;
  title: string;
  description: string;
  type: string;
  thumbnail: string;
  location: string;
  eventDate: string;
  creatorEmail: string;
}

const JoinedEventsPage = () => {
  const [events, setEvents] = useState<JoinedEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJoinedEvents = async () => {
      try {
        // Get JWT token
        const tokenResponse = await fetch(
          "http://localhost:5000/api/auth/token",
          {
            method: "GET",
            credentials: "include",
          },
        );

        const tokenResult = await tokenResponse.json();

        if (!tokenResponse.ok || !tokenResult.token) {
          throw new Error("Please login to see your joined events.");
        }

        // Fetch joined events
        const response = await fetch("http://localhost:5000/joined-events", {
          headers: {
            Authorization: `Bearer ${tokenResult.token}`,
          },
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to load joined events.");
        }

        setEvents(result.data ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchJoinedEvents();
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
      <main className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <div className="mb-3 h-4 w-32 animate-pulse rounded bg-gray-200" />
            <div className="h-9 w-56 animate-pulse rounded bg-gray-200" />
            <div className="mt-3 h-4 w-80 max-w-full animate-pulse rounded bg-gray-200" />
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
          <p className="font-semibold text-green-600">YOUR ACTIVITIES</p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Joined Events
          </h1>

          <p className="mt-3 text-gray-600">
            Keep track of the community events you have joined.
          </p>
        </div>

        {events.length === 0 ? (
          <div className="rounded-xl border bg-white p-10 text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              No joined events yet
            </h2>

            <p className="mt-2 text-gray-600">
              Explore upcoming events and join a community activity.
            </p>

            <Link
              href="/upcoming-events"
              className="mt-5 inline-block rounded-lg bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
            >
              Explore Events
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
                  width={400}
                  height={224}
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
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default JoinedEventsPage;
