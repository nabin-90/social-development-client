
"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

interface ProfileFormProps {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
  };
}

const ProfileForm = ({ user }: ProfileFormProps) => {
  const [name, setName] = useState(user.name || "");
  const [image, setImage] = useState(user.image || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleUpdateProfile = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!name.trim()) {
      setError("Name is required.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
        image: image.trim() || null,
      });

      if (error) {
        setError(error.message || "Profile update failed.");
        return;
      }

      setSuccess("Profile updated successfully!");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-green-500 dark:focus:ring-green-900";

  const labelClass =
    "mb-2 block font-medium text-gray-700 dark:text-gray-300";

  return (
    <main className="min-h-[70vh] bg-gray-50 px-4 py-12 dark:bg-gray-950">
      <div className="mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            My Profile
          </h1>

          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage your account information.
          </p>
        </div>

        <div className="mb-8 flex items-center gap-4">
          <Image
            src={image || "https://i.pravatar.cc/100"}
            alt={name || "Profile"}
            width={80}
            height={80}
            className="h-20 w-20 rounded-full border border-gray-200 object-cover dark:border-gray-700"
          />

          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {name}
            </h2>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              {user.email}
            </p>
          </div>
        </div>

        <form onSubmit={handleUpdateProfile} className="space-y-5">
          <div>
            <label htmlFor="name" className={labelClass}>
              Full Name
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>
              Email Address
            </label>

            <input
              id="email"
              type="email"
              value={user.email}
              readOnly
              className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-100 px-4 py-3 text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
            />

            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Email address cannot be changed here.
            </p>
          </div>

          <div>
            <label htmlFor="image" className={labelClass}>
              Profile Photo URL
            </label>

            <input
              id="image"
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/photo.jpg"
              className={inputClass}
            />
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/40 dark:text-red-400"
            >
              {error}
            </p>
          )}

          {success && (
            <p
              role="status"
              className="rounded-lg bg-green-50 p-3 text-sm text-green-600 dark:bg-green-950/40 dark:text-green-400"
            >
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-green-700 px-4 py-3 font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Updating Profile..." : "Update Profile"}
          </button>
        </form>
      </div>
    </main>
  );
};

const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-gray-50 dark:bg-gray-950">
        <p className="text-gray-600 dark:text-gray-400">
          Loading profile...
        </p>
      </main>
    );
  }

  if (!session?.user) {
    return null;
  }

  return <ProfileForm key={session.user.id} user={session.user} />;
};

export default ProfilePage;
