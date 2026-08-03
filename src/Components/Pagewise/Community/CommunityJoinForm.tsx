import { useState, type FormEvent } from "react";
import { FiSend } from "react-icons/fi";
import { partnershipApi } from "../../../lib/endpoints";
import { joinInterests } from "../../../data/community";

const CommunityJoinForm = () => {
  const [form, setForm] = useState({
    contactName: "",
    contact: "",
    email: "",
    institution: "",
    interest: joinInterests[0],
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const res = await partnershipApi.create({
        contactName: form.contactName,
        institution: form.institution || "IGSC Community Member",
        contact: form.contact,
        email: form.email || undefined,
        message: `[Community Join Request]\nInterest: ${form.interest}\n\n${form.message || "I would like to join the IGSC community."}`,
      });
      setSuccess(res.message);
      setForm({
        contactName: "",
        contact: "",
        email: "",
        institution: "",
        interest: joinInterests[0],
        message: "",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Full name *
          </label>
          <input
            required
            value={form.contactName}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, contactName: e.target.value }))
            }
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-emerald-400 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Mobile number *
          </label>
          <input
            required
            value={form.contact}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, contact: e.target.value }))
            }
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-emerald-400 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
            placeholder="01XXXXXXXXX"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, email: e.target.value }))
            }
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-emerald-400 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
            placeholder="you@email.com"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            School / organisation
          </label>
          <input
            value={form.institution}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, institution: e.target.value }))
            }
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-emerald-400 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
            placeholder="College, company, or area"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
          I want to *
        </label>
        <select
          required
          value={form.interest}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, interest: e.target.value }))
          }
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-emerald-400 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
        >
          {joinInterests.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Tell us more (optional)
        </label>
        <textarea
          rows={3}
          value={form.message}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, message: e.target.value }))
          }
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-emerald-400 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
          placeholder="Skills, availability, or which group interests you..."
        />
      </div>

      {error && (
        <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </p>
      )}
      {success && (
        <p className="rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
          {success}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60 sm:w-auto sm:px-8"
      >
        {submitting ? "Submitting..." : "Join the community"}
        <FiSend className="h-4 w-4" />
      </button>
    </form>
  );
};

export default CommunityJoinForm;
