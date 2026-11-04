
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white text-gray-600 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-400">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
              Social<span className="text-primary">Dev</span>
              <span className="text-primary">.</span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6">
              Connect with your community, discover meaningful events, and
              make a positive impact together.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="transition hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="transition hover:text-primary"
                >
                  Upcoming Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
              Account
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/sign-in"
                  className="transition hover:text-primary"
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  href="/sign-up"
                  className="transition hover:text-primary"
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
              About SocialDev
            </h3>
            <p className="text-sm leading-6">
              A community platform where people come together to organize
              events, share experiences, and create positive change.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-6 text-center text-sm dark:border-gray-800 sm:flex-row">
          <p>
            © {new Date().getFullYear()} SocialDev. All rights reserved.
          </p>

          <p>
            Built with <span className="font-semibold text-primary">Next.js</span>{" "}
            & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
