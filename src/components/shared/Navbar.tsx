
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const Navbar = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  };

  const user = session?.user;

  return (
    <nav className="relative z-50 border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-bold text-green-700">
          SocialDev
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/upcoming-events"
            className="text-gray-700 transition hover:text-green-700"
          >
            Upcoming Events
          </Link>

          {!isPending && !user && (
            <>
              <Link
                href="/login"
                className="rounded-md bg-green-700 px-5 py-2 text-white transition hover:bg-green-800"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="hidden rounded-md border border-green-700 px-5 py-2 text-green-700 transition hover:bg-green-50 sm:block"
              >
                Register
              </Link>
            </>
          )}

          {!isPending && user && (
            <div className="group relative">
              <button
                type="button"
                className="flex items-center gap-2 rounded-full border border-gray-200 p-1 pr-3 hover:bg-gray-50"
              >
                <img
                  src={user.image || "https://i.pravatar.cc/100"}
                  alt={user.name}
                  className="h-9 w-9 rounded-full object-cover"
                />

                <span className="font-medium text-gray-700">
                  {user.name}
                </span>
              </button>

              <div className="invisible absolute right-0 top-full mt-2 w-48 rounded-lg border bg-white py-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100">
                <Link
                  href="/dashboard/create-event"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50"
                >
                  Create Event
                </Link>

                <Link
                  href="/dashboard/manage-events"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50"
                >
                  Manage Events
                </Link>

                <Link
                  href="/dashboard/joined-events"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50"
                >
                  Joined Events
                </Link>

                <hr className="my-2" />

                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
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
