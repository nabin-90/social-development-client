"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import EventCardSkeleton from "@/components/shared/EventCardSkeleton";
import EventCard, { type EventCardData } from "@/components/shared/EventCard";

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
  const [events, setEvents] = useState<EventCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJoinedEvents = async () => {
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
          throw new Error("Please login to see your joined events.");
        }

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

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-12 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <div className="mb-3 h-4 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
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

  if (error) {
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
          <p className="font-semibold text-green-600">YOUR ACTIVITIES</p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            Joined Events
          </h1>

          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Keep track of the community events you have joined.
          </p>
        </div>

        {events.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-10 text-center dark:border-gray-800 dark:bg-gray-900">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              No joined events yet
            </h2>

            <p className="mt-2 text-gray-600 dark:text-gray-400">
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
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default JoinedEventsPage;
