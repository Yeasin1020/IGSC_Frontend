import { useState, type FormEvent } from "react";
import {
  FaCheckCircle,
  FaSchool,
  FaUniversity,
} from "react-icons/fa";
import { GiGraduateCap } from "react-icons/gi";
import { MdMosque } from "react-icons/md";
import { HiArrowLongRight } from "react-icons/hi2";
import { partnershipApi } from "../../../lib/endpoints";

const InstitutionPartnership = () => {
  const institutionTypes = [
    { icon: <FaSchool size={14} />, label: "Schools" },
    { icon: <GiGraduateCap size={15} />, label: "Colleges" },
    { icon: <MdMosque size={15} />, label: "Madrasahs" },
    { icon: <FaUniversity size={14} />, label: "Universities" },
  ];

  const benefits = [
    "Free program delivery at your institution",
    "Flexible scheduling tailored to your academic calendar",
    "Joint certification opportunities for students",
    "Modern learning resources with experienced mentors",
  ];

  const [form, setForm] = useState({
    contactName: "",
    role: "",
    institution: "",
    institutionType: "",
    contact: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const inputStyle =
    "w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-white/25 outline-none transition focus:border-blue-300/40 focus:bg-white/10";

  const labelStyle =
    "block mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/40";

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const res = await partnershipApi.create({
        contactName: form.contactName,
        role: form.role || undefined,
        institution: form.institution,
        institutionType: form.institutionType || undefined,
        contact: form.contact,
        message: form.message || undefined,
      });
      setSuccess(res.message);
      setForm({
        contactName: "",
        role: "",
        institution: "",
        institutionType: "",
        contact: "",
        message: "",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="partnership" className="w-full bg-gray-50 py-10 lg:py-14 dark:bg-[#0b1220]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative grid grid-cols-1 gap-8 overflow-hidden rounded-xl border border-white/10 bg-linear-to-br from-[#07101f] via-[#0d1b33] to-[#07101f] p-5 sm:p-7 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:p-10">
          <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative z-10">
            <div className="mb-4 text-[11px] uppercase tracking-[0.18em] text-blue-200">
              Institutional Partnership
            </div>

            <h2 className="text-[1.7rem] leading-tight font-semibold text-white sm:text-[2.1rem] lg:text-[2.4rem]">
              Bring <span className="text-blue-300">IGSC programs</span> to your
              institution
            </h2>

            <p className="mt-3 max-w-lg text-sm leading-6 text-white/60">
              Collaborate to deliver certified learning programs and workshops
              directly inside your institution.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {institutionTypes.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70"
                >
                  <span className="text-blue-300">{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3">
              {benefits.map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <FaCheckCircle size={11} className="mt-1 text-emerald-300" />
                  <p className="text-sm leading-5 text-white/65">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 rounded-lg border border-white/15 bg-white/10 p-4 backdrop-blur-xl sm:p-5 lg:p-6">
            <div className="mb-4">
              <h3 className="text-[1.1rem] font-semibold text-white">
                Request Partnership
              </h3>
              <p className="mt-1 text-xs text-white/50">
                Fill the form — we’ll contact you soon.
              </p>
            </div>

            <form className="space-y-3.5" onSubmit={onSubmit}>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className={labelStyle}>Your Name</label>
                  <input
                    required
                    className={inputStyle}
                    placeholder="Dr. Ahmed Rahman"
                    value={form.contactName}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        contactName: e.target.value,
                      }))
                    }
                  />
                </div>
                <div>
                  <label className={labelStyle}>Role</label>
                  <input
                    className={inputStyle}
                    placeholder="Principal / Teacher"
                    value={form.role}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, role: e.target.value }))
                    }
                  />
                </div>
              </div>

              <div>
                <label className={labelStyle}>Institution</label>
                <input
                  required
                  className={inputStyle}
                  placeholder="Comilla College"
                  value={form.institution}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      institution: e.target.value,
                    }))
                  }
                />
              </div>

              <div>
                <label className={labelStyle}>Type</label>
                <select
                  className={inputStyle}
                  value={form.institutionType}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      institutionType: e.target.value,
                    }))
                  }
                >
                  <option className="bg-slate-900" value="">
                    Select type
                  </option>
                  <option className="bg-slate-900" value="School">
                    School
                  </option>
                  <option className="bg-slate-900" value="College">
                    College
                  </option>
                  <option className="bg-slate-900" value="Madrasah">
                    Madrasah
                  </option>
                  <option className="bg-slate-900" value="University">
                    University
                  </option>
                </select>
              </div>

              <div>
                <label className={labelStyle}>Contact</label>
                <input
                  required
                  className={inputStyle}
                  placeholder="+880 1700-000000"
                  value={form.contact}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, contact: e.target.value }))
                  }
                />
              </div>

              <div>
                <label className={labelStyle}>Message</label>
                <textarea
                  rows={3}
                  className={inputStyle}
                  placeholder="Tell us more..."
                  value={form.message}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, message: e.target.value }))
                  }
                />
              </div>

              {error && (
                <p className="rounded-lg bg-red-500/20 px-3 py-2 text-sm text-red-200">
                  {error}
                </p>
              )}
              {success && (
                <p className="rounded-lg bg-emerald-500/20 px-3 py-2 text-sm text-emerald-200">
                  {success}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-white py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-px hover:bg-blue-50 hover:text-blue-700 disabled:opacity-60"
              >
                {submitting ? "Sending..." : "Send Request"}
                <HiArrowLongRight size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstitutionPartnership;
