
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useState } from "react";
import { useTheme } from "./ThemeProvider";

const Navbar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { data: session, isPending } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  };

  const user = session?.user;

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 py-3 sm:gap-6 sm:px-4 sm:py-4">
        <Link
          href="/"
          className="shrink-0 text-xl font-bold text-green-700 dark:text-green-400 sm:text-2xl"
        >
          SocialDev
        </Link>

        <div className="flex min-w-0 items-center gap-3 sm:gap-6">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 text-lg transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          <Link
            href="/upcoming-events"
            className="whitespace-nowrap text-sm text-gray-700 transition hover:text-green-700 dark:text-gray-300 dark:hover:text-green-400 sm:text-base"
          >
            Upcoming Events
          </Link>

          {!isPending && !user && (
            <>
              <Link
                href="/login"
                className="whitespace-nowrap rounded-md bg-green-700 px-3 py-2 text-sm text-white transition hover:bg-green-800 sm:px-5 sm:text-base"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="hidden whitespace-nowrap rounded-md border border-green-700 px-5 py-2 text-green-700 transition hover:bg-green-50 dark:border-green-500 dark:text-green-400 dark:hover:bg-green-950 md:block"
              >
                Register
              </Link>
            </>
          )}

          {!isPending && user && (
            <div className="group relative shrink-0">
              <button
                type="button"
                aria-label="Open user menu"
                aria-expanded={isMenuOpen}
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-full border border-gray-200 p-1 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 sm:pr-3"
              >
                <Image
                  src={user.image || "https://i.pravatar.cc/100"}
                  alt={user.name || "User profile"}
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-full object-cover"
                />

                <span className="hidden max-w-32 truncate font-medium text-gray-700 dark:text-gray-200 sm:block">
                  {user.name}
                </span>
              </button>

              <div
                className={`absolute right-0 top-full mt-2 w-48 rounded-lg border border-gray-200 bg-white py-2 shadow-lg transition-all dark:border-gray-700 dark:bg-gray-900 ${
                  isMenuOpen
                    ? "visible opacity-100"
                    : "invisible opacity-0 sm:group-hover:visible sm:group-hover:opacity-100"
                }`}
              >
                <Link
                  href="/dashboard/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Profile
                </Link>

                <Link
                  href="/dashboard/create-event"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Create Event
                </Link>

                <Link
                  href="/dashboard/manage-events"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Manage Events
                </Link>

                <Link
                  href="/dashboard/joined-events"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Joined Events
                </Link>

                <hr className="my-2 border-gray-200 dark:border-gray-700" />

                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
