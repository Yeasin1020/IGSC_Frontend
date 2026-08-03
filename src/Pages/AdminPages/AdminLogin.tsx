import { useState, type FormEvent } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import ThemeToggle from "../../Components/Shared/ThemeToggle";

// ── DEMO ONLY — delete this block later ─────────────────────────────────────
const DEMO_LOGINS = [
  {
    label: "Demo Admin",
    email: "admin@igsc.com",
    password: "Admin123!",
    type: "admin" as const,
  },
  {
    label: "Demo User (Student)",
    email: "student@demo.com",
    password: "Student123!",
    type: "user" as const,
  },
];
// ────────────────────────────────────────────────────────────────────────────

const AdminLogin = () => {
  const { login, logout, user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from =
    (location.state as { from?: string } | null)?.from || "/admin-panel";

  const [email, setEmail] = useState("admin@igsc.com");
  const [password, setPassword] = useState("Admin123!");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!loading && user && isAdmin) {
    return <Navigate to="/admin-panel" replace />;
  }

  if (!loading && user && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  const signIn = async (
    nextEmail: string,
    nextPassword: string,
    accountType: "admin" | "user" = "admin",
  ) => {
    setSubmitting(true);
    setError("");
    setEmail(nextEmail);
    setPassword(nextPassword);
    try {
      const loggedIn = await login(nextEmail, nextPassword);

      if (accountType === "user") {
        navigate("/dashboard", { replace: true });
        return;
      }

      if (loggedIn.role !== "admin" && loggedIn.role !== "superAdmin") {
        await logout();
        setError("This account does not have admin access");
        return;
      }
      navigate(from, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await signIn(email, password, "admin");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 px-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/95 p-8 shadow-2xl dark:bg-gray-900/95 dark:text-gray-100">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-indigo-500 uppercase dark:text-indigo-300">
            IGSC Admin
          </p>
          <h1 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
            Sign in
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage courses, services and enrollments
          </p>
        </div>

        {/* DEMO ONLY — delete this section later */}
        <div className="mb-5 rounded-2xl border border-amber-200 bg-amber-50 p-3 dark:border-amber-900/60 dark:bg-amber-950/40">
          <p className="mb-2 text-xs font-semibold tracking-wide text-amber-800 uppercase dark:text-amber-200">
            Demo 1-click login (temporary)
          </p>
          <div className="space-y-2">
            {DEMO_LOGINS.map((demo) => (
              <button
                key={demo.email}
                type="button"
                disabled={submitting}
                onClick={() => signIn(demo.email, demo.password, demo.type)}
                className="flex w-full flex-col rounded-xl border border-amber-200 bg-white px-3 py-2.5 text-left transition hover:border-indigo-300 hover:bg-indigo-50 disabled:opacity-60 dark:border-amber-900/50 dark:bg-gray-950 dark:hover:border-indigo-700 dark:hover:bg-indigo-950/40"
              >
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {demo.label}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {demo.email} · {demo.password}
                </span>
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-amber-700/80 dark:text-amber-300/70">
            Super admin manually login koren — demo button e nai.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-400 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-400 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
            />
          </div>

          {error && (
            <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-950/40 dark:text-red-300">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60"
          >
            {submitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-sm text-indigo-600 hover:underline dark:text-indigo-300"
          >
            Back to website
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
