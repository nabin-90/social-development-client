
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

        {/* Right Side Tree Emoji */}
        <div className="flex items-center justify-center">
          <span
            aria-hidden="true"
            className="text-[160px] leading-none drop-shadow-2xl transition duration-500 hover:scale-110 sm:text-[200px] lg:text-[240px]"
          >
            🌳
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
