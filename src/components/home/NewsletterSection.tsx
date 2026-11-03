
const NewsletterSection = () => {
  return (
    <section className="bg-green-50 px-4 py-14 dark:bg-gray-950 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-4xl rounded-3xl bg-green-700 px-6 py-12 text-center shadow-lg dark:bg-green-900 sm:px-12 sm:py-16">
        <p className="mb-3 font-semibold tracking-wider text-green-200">
          STAY CONNECTED
        </p>

        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Be Part of Something Meaningful
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-green-100">
          Get updates about upcoming community events, inspiring stories,
          and opportunities to make a positive difference.
        </p>

        <div className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
          <input
            type="email"
            placeholder="Enter your email address"
            className="min-w-0 flex-1 rounded-lg border border-white/20 bg-white px-4 py-3 text-gray-900 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-green-300"
          />

          <button
            type="button"
            className="rounded-lg bg-white px-6 py-3 font-semibold text-green-700 transition hover:bg-green-100"
          >
            Subscribe
          </button>
        </div>

        <p className="mt-4 text-sm text-green-200">
          Join our community and stay inspired!
        </p>
      </div>
    </section>
  );
};

export default NewsletterSection;
