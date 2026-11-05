
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-950 dark:via-gray-900 dark:to-emerald-950">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:py-16 md:grid-cols-2 md:gap-12 md:py-28">
        {/* Left Content */}
        <div>
          <span className="mb-5 inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700 dark:bg-green-900/50 dark:text-green-300">
            Together, We Can Make a Difference
          </span>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl lg:text-6xl">
            Small Actions,
            <span className="block text-green-700 dark:text-green-400">
              Big Changes.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-7 text-gray-600 dark:text-gray-300 sm:text-lg">
            Discover meaningful community events, connect with
            passionate people, and take action to build a better
            society together.
          </p>

          {/* CTA Button */}
          <div className="mt-8">
            <Link
              href="/upcoming-events"
              className="inline-flex items-center gap-2 rounded-lg bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-500"
            >
              Explore Events
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            Be part of something meaningful.
          </p>
        </div>

        {/* Right Visual Card */}
        <div className="relative flex justify-center">
          <div className="w-full max-w-md rounded-3xl border border-green-100 bg-white p-6 shadow-xl dark:border-green-900 dark:bg-gray-900 sm:p-8">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/50 dark:text-green-300">
                Community Event
              </span>
              <span className="text-2xl">🌱</span>
            </div>

            <div className="mt-8 flex h-48 items-center justify-center rounded-2xl bg-gradient-to-br from-green-100 to-emerald-200 dark:from-green-900 dark:to-emerald-800">
              <span className="text-7xl">🌳</span>
            </div>

            <h2 className="mt-6 text-xl font-bold text-gray-900 dark:text-gray-100">
              Plant Trees, Grow Hope
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
              Join your community to create a greener and healthier
              environment for everyone.
            </p>

            <div className="mt-6 flex items-center justify-between border-t pt-4">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Make an Impact
              </span>
              <span className="font-semibold text-green-700 dark:text-green-400">
                Join Us →
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
