import { useState, type FormEvent } from "react";
import { FiSend } from "react-icons/fi";
import { partnershipApi } from "../../../lib/endpoints";
import type { HealthCampaign } from "../../../data/healthCampaigns";

interface HealthRegistrationFormProps {
  campaigns: HealthCampaign[];
}

const HealthRegistrationForm = ({ campaigns }: HealthRegistrationFormProps) => {
  const registerable = campaigns.filter((c) => c.status !== "completed");

  const [form, setForm] = useState({
    contactName: "",
    contact: "",
    email: "",
    address: "",
    campaignId: registerable[0]?.id || "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const selectedCampaign = registerable.find((c) => c.id === form.campaignId);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess("");

    const campaignLine = selectedCampaign
      ? `Campaign: ${selectedCampaign.title} (${selectedCampaign.location}, ${selectedCampaign.date})`
      : "Campaign: General interest";

    try {
      const res = await partnershipApi.create({
        contactName: form.contactName,
        institution: form.address || "Health Campaign Participant",
        contact: form.contact,
        email: form.email || undefined,
        message: `[Health Campaign Registration]\n${campaignLine}\n\n${form.message || "I would like to register for this health campaign."}`,
      });
      setSuccess(res.message);
      setForm({
        contactName: "",
        contact: "",
        email: "",
        address: "",
        campaignId: registerable[0]?.id || "",
        message: "",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
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
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-rose-400 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
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
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-rose-400 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
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
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-rose-400 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
            placeholder="you@email.com"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Area / address
          </label>
          <input
            value={form.address}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, address: e.target.value }))
            }
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-rose-400 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
            placeholder="Mirpur, Dhaka"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Select campaign *
        </label>
        <select
          required
          value={form.campaignId}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, campaignId: e.target.value }))
          }
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-rose-400 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
        >
          {registerable.map((campaign) => (
            <option key={campaign.id} value={campaign.id}>
              {campaign.title} — {campaign.location}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Note (optional)
        </label>
        <textarea
          rows={3}
          value={form.message}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, message: e.target.value }))
          }
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-rose-400 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
          placeholder="Any health concern or special requirement..."
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
        disabled={submitting || registerable.length === 0}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600 py-3 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:opacity-60 sm:w-auto sm:px-8"
      >
        {submitting ? "Submitting..." : "Register for camp"}
        <FiSend className="h-4 w-4" />
      </button>
    </form>
  );
};

export default HealthRegistrationForm;
