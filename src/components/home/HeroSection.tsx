
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 md:grid-cols-2 md:py-28">

        {/* Left Content */}
        <div>
          <span className="mb-5 inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
            Together, We Can Make a Difference
          </span>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Small Actions,
            <span className="block text-green-700">
              Big Changes.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-7 text-gray-600 sm:text-lg">
            Discover meaningful community events, connect with
            passionate people, and take action to build a better
            society together.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/upcoming-events"
              className="rounded-lg bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800"
            >
              Explore Events
            </Link>

            <Link
              href="/login"
              className="rounded-lg border border-green-700 px-6 py-3 font-semibold text-green-700 transition hover:bg-green-50"
            >
              Get Started
            </Link>
          </div>

          <p className="mt-6 text-sm text-gray-500">
            Be part of something meaningful.
          </p>
        </div>

        {/* Right Visual Card */}
        <div className="relative flex justify-center">
          <div className="w-full max-w-md rounded-3xl border border-green-100 bg-white p-6 shadow-xl sm:p-8">

            <div className="flex items-center justify-between">
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                Community Event
              </span>
              <span className="text-2xl">🌱</span>
            </div>

            <div className="mt-8 flex h-48 items-center justify-center rounded-2xl bg-gradient-to-br from-green-100 to-emerald-200">
              <span className="text-7xl">🌳</span>
            </div>

            <h2 className="mt-6 text-xl font-bold text-gray-900">
              Plant Trees, Grow Hope
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-600">
              Join your community to create a greener and healthier
              environment for everyone.
            </p>

            <div className="mt-6 flex items-center justify-between border-t pt-4">
              <span className="text-sm font-medium text-gray-500">
                Make an Impact
              </span>
              <span className="font-semibold text-green-700">
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
