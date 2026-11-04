"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
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

const EventDetailsPage = () => {
  const router = useRouter();

  const [joining, setJoining] = useState(false);
  const [joinError, setJoinError] = useState("");
  const [joinSuccess, setJoinSuccess] = useState("");

  const params = useParams<{ id: string }>();
  const eventId = params.id;

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/events/${eventId}`,
        );

        if (!response.ok) {
          throw new Error("Failed to load event details.");
        }

        const result = await response.json();

        if (!result.success || !result.data) {
          throw new Error("Event not found.");
        }

        setEvent(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);

  const handleJoinEvent = async () => {
    setJoining(true);
    setJoinError("");
    setJoinSuccess("");

    try {
      const tokenResponse = await fetch("/api/auth/token", {
        method: "GET",
        credentials: "include",
      });

      const tokenResult = await tokenResponse.json();

      if (!tokenResponse.ok || !tokenResult.token) {
        router.push("/login");
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/events/${eventId}/join`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${tokenResult.token}`,
          },
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to join event.");
      }

      setJoinSuccess("You have successfully joined this event!");
    } catch (err) {
      setJoinError(
        err instanceof Error ? err.message : "Something went wrong.",
      );
    } finally {
      setJoining(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(`${date}T00:00:00`).toLocaleDateString("en-BD", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
        <p className="text-gray-600 dark:text-gray-400">
          Loading event details...
        </p>
      </main>
    );
  }

  if (error || !event) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-50 px-4 dark:bg-gray-950">
        <p className="text-red-600 dark:text-red-400">
          {error || "Event not found."}
        </p>

        <Link
          href="/upcoming-events"
          className="font-semibold text-green-600 hover:underline dark:text-green-400"
        >
          Back to Upcoming Events
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-16 dark:bg-gray-950">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/upcoming-events"
          className="mb-8 inline-block font-medium text-green-600 hover:underline dark:text-green-400"
        >
          ← Back to Upcoming Events
        </Link>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <Image
            src={event.thumbnail}
            alt={event.title}
            width={1200}
            height={600}
            className="h-72 w-full object-cover sm:h-96"
          />

          <div className="p-6 sm:p-10">
            <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700 dark:bg-green-950 dark:text-green-400">
              {event.type}
            </span>

            <h1 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              {event.title}
            </h1>

            <p className="mt-6 leading-8 text-gray-600 dark:text-gray-300">
              {event.description}
            </p>

            <div className="mt-8 grid gap-5 rounded-xl bg-gray-50 p-6 dark:bg-gray-800 sm:grid-cols-2">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Event Date
                </p>

                <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                  📅 {formatDate(event.eventDate)}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Location
                </p>

                <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                  📍 {event.location}
                </p>
              </div>

              <div className="sm:col-span-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Organized By
                </p>

                <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                  {event.creatorEmail}
                </p>
              </div>
            </div>

            <div className="mt-8 space-y-3">
              {joinError && (
                <p
                  role="alert"
                  className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/40 dark:text-red-400"
                >
                  {joinError}
                </p>
              )}

              {joinSuccess && (
                <p
                  role="status"
                  className="rounded-lg bg-green-50 p-3 text-sm text-green-700 dark:bg-green-950/40 dark:text-green-400"
                >
                  {joinSuccess}
                </p>
              )}

              <button
                onClick={handleJoinEvent}
                disabled={joining}
                className="rounded-lg bg-green-600 px-8 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {joining ? "Joining..." : "Join Event"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default EventDetailsPage;
