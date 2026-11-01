
const EventCardSkeleton = () => {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Image placeholder */}
      <div className="h-52 w-full bg-gray-200" />

      <div className="space-y-4 p-5">
        {/* Event type */}
        <div className="h-4 w-24 rounded bg-gray-200" />

        {/* Event title */}
        <div className="h-6 w-3/4 rounded bg-gray-200" />

        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-5/6 rounded bg-gray-200" />
        </div>

        {/* Location and date */}
        <div className="space-y-2">
          <div className="h-4 w-2/3 rounded bg-gray-200" />
          <div className="h-4 w-1/2 rounded bg-gray-200" />
        </div>

        {/* Button */}
        <div className="h-10 w-full rounded-lg bg-gray-200" />
      </div>
    </div>
  );
};

export default EventCardSkeleton;
