
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecentEvents = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/events?limit=6"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch events.");
        }

        const result = await response.json();

        const eventList = Array.isArray(result)
          ? result
          : result.events ?? result.data ?? [];

        setEvents(eventList);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Something went wrong."
        );
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
    <section className="bg-gray-50 px-4 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mb-12 text-center">
          <span className="inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            Make a Difference
          </span>

          <h2 className="mt-5 text-3xl font-bold text-gray-900 sm:text-4xl">
            Recent Upcoming Events
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
            Discover the latest community events and find opportunities
            to contribute to a better society.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <p className="py-12 text-center text-gray-500">
            Loading upcoming events...
          </p>
        )}

        {/* Error State */}
        {!loading && error && (
          <p className="py-12 text-center text-red-600">
            {error}
          </p>
        )}

        {/* Empty State */}
        {!loading && !error && events.length === 0 && (
          <p className="py-12 text-center text-gray-500">
            No upcoming events available right now.
          </p>
        )}

        {/* Event Cards */}
        {!loading && !error && events.length > 0 && (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <article
                key={event._id}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Event Thumbnail */}
                <div
                  className="h-52 bg-gray-200 bg-cover bg-center"
                  style={{
                    backgroundImage: `url("${event.thumbnail}")`,
                  }}
                  role="img"
                  aria-label={event.title}
                />

                <div className="p-6">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    {event.type}
                  </span>

                  <h3 className="mt-4 text-xl font-bold text-gray-900">
                    {event.title}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600">
                    {event.description}
                  </p>

                  <div className="mt-5 space-y-2 border-t pt-4 text-sm text-gray-500">
                    <p>📅 {formatDate(event.eventDate)}</p>
                    <p>📍 {event.location}</p>
                  </div>

                  <Link
                    href={`/events/${event._id}`}
                    className="mt-5 inline-flex font-semibold text-green-700 transition hover:text-green-900"
                  >
                    View Details →
                  </Link>
                </div>
              </article>
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
