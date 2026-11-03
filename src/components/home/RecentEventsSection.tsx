"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import EventCardSkeleton from "../shared/EventCardSkeleton";
import EventCard, { type EventCardData } from "../shared/EventCard";

interface Event {
  _id: string;
  title: string;
  description: string;
  type: string;
  thumbnail: string;
  location: string;
  eventDate: string;
}

const RecentEventsSection = () => {
  const [events, setEvents] = useState<EventCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecentEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/events?limit=6");

        if (!response.ok) {
          throw new Error("Failed to fetch events.");
        }

        const result = await response.json();

        const eventList = Array.isArray(result)
          ? result
          : (result.events ?? result.data ?? []);

        setEvents(eventList);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecentEvents();
  }, []);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-BD", {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "Asia/Dhaka",
    });
  };

  return (
    <section className="bg-gray-50 px-4 py-14 dark:bg-gray-950 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-12 text-center">
          <span className="inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700 dark:bg-green-900/50 dark:text-green-300">
            Make a Difference
          </span>

          <h2 className="mt-5 text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">
            Recent Upcoming Events
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600 dark:text-gray-300">
            Discover the latest community events and find opportunities to
            contribute to a better society.
          </p>
        </div>

        {/* Loading Skeletons */}
        {loading && (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <EventCardSkeleton key={index} />
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <p className="py-12 text-center text-red-600 dark:text-red-400">
            {error}
          </p>
        )}

        {/* Empty State */}
        {!loading && !error && events.length === 0 && (
          <p className="py-12 text-center text-gray-500 dark:text-gray-400">
            No upcoming events available right now.
          </p>
        )}

        {/* Event Cards */}
        {!loading && !error && events.length > 0 && (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Link
            href="/upcoming-events"
            className="inline-block rounded-lg bg-green-700 px-7 py-3 font-semibold text-white transition hover:bg-green-800"
          >
            View All Events
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentEventsSection;
