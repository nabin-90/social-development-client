
import Link from "next/link";

const features = [
  {
    icon: "🔍",
    title: "Discover Events",
    description:
      "Explore upcoming social development events and find opportunities to make a positive impact in your community.",
    link: "/upcoming-events",
    linkText: "Explore Events",
  },
  {
    icon: "📅",
    title: "Create Events",
    description:
      "Organize meaningful community events and bring people together to work toward a common goal.",
    link: "/dashboard/create-event",
    linkText: "Create Event",
  },
  {
    icon: "🤝",
    title: "Join Community",
    description:
      "Connect with like-minded people and participate in activities that help build a better society.",
    link: "/upcoming-events",
    linkText: "Join an Event",
  },
  {
    icon: "📊",
    title: "Track Activities",
    description:
      "Keep track of the events you have joined and manage the events you have created.",
    link: "/dashboard",
    linkText: "Manage Activities",
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-white px-4 py-14 dark:bg-gray-950 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700 dark:bg-green-900/50 dark:text-green-300">
            What We Offer
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
            Everything You Need to
            <span className="text-green-700 dark:text-green-400">
              {" "}Make an Impact
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-gray-600 dark:text-gray-300">
            From discovering meaningful events to organizing your own
            initiatives, we make community participation easier.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-green-200 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 dark:hover:border-green-800"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-100 text-3xl transition group-hover:bg-green-700 dark:bg-green-900/50">
                {feature.icon}
              </div>

              <h3 className="mt-6 text-xl font-bold text-gray-900 dark:text-gray-100">
                {feature.title}
              </h3>

              <p className="mt-3 min-h-28 text-sm leading-6 text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>

              <Link
                href={feature.link}
                className="mt-5 inline-flex items-center gap-2 font-semibold text-green-700 transition hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
              >
                {feature.linkText}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;
