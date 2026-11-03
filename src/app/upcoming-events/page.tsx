"use client";

import { useEffect, useState } from "react";
import EventCardSkeleton from "@/components/shared/EventCardSkeleton";
import EventCard, { type EventCardData } from "@/components/shared/EventCard";

const UpcomingEventsPage = () => {
  const [events, setEvents] = useState<EventCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/events");

        if (!response.ok) {
          throw new Error("Failed to load upcoming events.");
        }

        const result = await response.json();
        setEvents(result.data ?? []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-16 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="mb-3 font-semibold text-green-600 dark:text-green-400">
            MAKE A DIFFERENCE
          </p>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Upcoming Community Events
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-400">
            Discover meaningful activities and join hands to create positive
            changes in your community.
          </p>
        </div>

        {loading && (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <EventCardSkeleton key={index} />
            ))}
          </div>
        )}

        {!loading && error && (
          <p className="py-12 text-center text-red-600 dark:text-red-400">
            {error}
          </p>
        )}

        {!loading && !error && events.length === 0 && (
          <p className="py-12 text-center text-gray-600 dark:text-gray-400">
            No upcoming events available right now.
          </p>
        )}

        {!loading && !error && events.length > 0 && (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default UpcomingEventsPage;
