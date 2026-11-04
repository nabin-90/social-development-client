
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const LoginPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        setError(error.message || "Invalid email or password.");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "google" | "github") => {
    setError("");
    setSocialLoading(provider);

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        setError(error.message || `${provider} login failed.`);
        setSocialLoading("");
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setSocialLoading("");
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-green-500 dark:focus:ring-green-900";

  const labelClass =
    "mb-2 block font-medium text-gray-700 dark:text-gray-300";

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-950">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome Back!
          </h1>

          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Login to continue your community journey.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className={labelClass}>
              Email Address
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="password" className={labelClass}>
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
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

          <button
            type="submit"
            disabled={loading || !!socialLoading}
            className="w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />

          <span className="text-sm text-gray-500 dark:text-gray-400">
            OR CONTINUE WITH
          </span>

          <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
        </div>

        <div className="space-y-3">
          <button
            type="button"
            onClick={() => handleSocialLogin("google")}
            disabled={loading || !!socialLoading}
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 px-4 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            <span className="text-lg font-bold">G</span>
            {socialLoading === "google"
              ? "Connecting to Google..."
              : "Continue with Google"}
          </button>

          <button
            type="button"
            onClick={() => handleSocialLogin("github")}
            disabled={loading || !!socialLoading}
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 px-4 py-3 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            <span className="text-lg font-bold">⌘</span>
            {socialLoading === "github"
              ? "Connecting to GitHub..."
              : "Continue with GitHub"}
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-green-600 hover:underline dark:text-green-400"
          >
            Register
          </Link>
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
