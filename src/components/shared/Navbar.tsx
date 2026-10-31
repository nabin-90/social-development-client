import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* Website Logo */}
        <Link href="/" className="text-2xl font-bold text-green-700">
          SocialDev
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <Link
            href="/upcoming-events"
            className="text-gray-700 transition hover:text-green-700"
          >
            Upcoming Events
          </Link>

          <Link
            href="/login"
            className="rounded-md bg-green-700 px-5 py-2 text-white transition hover:bg-green-800"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;