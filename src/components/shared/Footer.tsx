"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const Footer = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const quickLinks = user
    ? [
        { label: "Upcoming Events", href: "/upcoming-events" },
        { label: "Profile", href: "/dashboard/profile" },
        { label: "Create Event", href: "/dashboard/create-event" },
        { label: "Manage Event", href: "/dashboard/manage-events" },
        { label: "Joined Event", href: "/dashboard/joined-events" },
      ]
    : [
        { label: "Upcoming Events", href: "/upcoming-events" },
        { label: "Login", href: "/login" },
        { label: "Register", href: "/register" },
      ];

  return (
    <footer className="border-t border-gray-200 bg-white text-gray-600 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-400">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1.2fr_1fr] lg:gap-16">
          {/* Brand */}
          <div>
            <Link
              href="/"
              scroll={true}
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              className="inline-block text-2xl font-bold tracking-tight text-green-700 transition hover:text-green-600 dark:text-green-400 dark:hover:text-green-300"
            >
              SocialDev
              <span className="text-green-500">.</span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7">
              A community platform where people come together to organize
              events, share experiences, and create positive change.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              Quick Links
            </h3>

            <div className="mt-3 mb-5 h-1 w-10 rounded-full bg-green-600 dark:bg-green-400" />

            {isPending ? (
              <p className="text-sm">Loading links...</p>
            ) : (
              <ul
                className={`grid grid-flow-col grid-rows-3 auto-cols-max gap-x-8 gap-y-3 text-sm ${
                  user ? "" : "grid-cols-1"
                }`}
              >
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      scroll={true}
                      onClick={() => {
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      }}
                      className="transition-colors duration-200 hover:text-green-700 dark:hover:text-green-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">
              Contact Us
            </h3>

            <div className="mt-3 mb-5 h-1 w-10 rounded-full bg-green-600 dark:bg-green-400" />

            <ul className="space-y-4 text-sm">
              <li>
                <p className="mb-1 font-medium text-gray-800 dark:text-gray-200">
                  Phone
                </p>

                <a
                  href="tel:+8801000000000"
                  className="transition-colors duration-200 hover:text-green-700 dark:hover:text-green-400"
                >
                  +880 1000-000000
                </a>
              </li>

              <li>
                <p className="mb-1 font-medium text-gray-800 dark:text-gray-200">
                  Email
                </p>

                <a
                  href="mailto:socialdev@gmail.com"
                  className="transition-colors duration-200 hover:text-green-700 dark:hover:text-green-400"
                >
                  socialdev@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-6 text-center text-sm dark:border-gray-800 sm:flex-row">
          <p>© {new Date().getFullYear()} SocialDev. All rights reserved.</p>

          <p>
            Built with{" "}
            <span className="font-semibold text-green-700 dark:text-green-400">
              Next.js
            </span>{" "}
            & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
