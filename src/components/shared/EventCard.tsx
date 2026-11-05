import Link from "next/link";

export interface EventCardData {
  _id: string;
  title: string;
  description: string;
  type: string;
  thumbnail: string;
  location: string;
  eventDate: string;
}

interface EventCardProps {
  event: EventCardData;
  updateHref?: string;
  onDelete?: (event: EventCardData) => void;
}

const EventCard = ({ event, updateHref, onDelete }: EventCardProps) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-BD", {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "Asia/Dhaka",
    });
  };

  return (
    <article className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 dark:hover:border-green-800">
      {/* Event Thumbnail */}
      <div
        className="h-52 bg-gray-200 bg-cover bg-center dark:bg-gray-800"
        style={{
          backgroundImage: `url("${event.thumbnail?.trim() || "/images/event-placeholder.png"}")`,
        }}
        role="img"
        aria-label={event.title}
      />

      <div className="p-6">
        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/50 dark:text-green-300">
          {event.type}
        </span>

        <h3 className="mt-4 text-xl font-bold text-gray-900 dark:text-gray-100">
          {event.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
          {event.description}
        </p>

        <div className="mt-5 space-y-2 border-t border-gray-200 pt-4 text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
          <p>📅 {formatDate(event.eventDate)}</p>
          <p>📍 {event.location}</p>
        </div>

        <div className="mt-6 space-y-3">
          
          <div>
            <Link
              href={`/events/${event._id}`}
              className="font-semibold text-green-500 transition hover:text-green-400"
            >
              View Details →
            </Link>
          </div>

          
          <div className="flex flex-wrap items-center gap-3">
            {updateHref && (
              <Link
                href={updateHref}
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Update Event
              </Link>
            )}

            {onDelete && (
              <button
                type="button"
                onClick={() => onDelete(event)}
                className="rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Delete Event
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default EventCard;
