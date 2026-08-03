import { useMemo, useState, type ReactNode } from "react";
import { Link } from "react-router";
import {
  FaHeartbeat,
  FaStethoscope,
  FaUserMd,
  FaLeaf,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUsers,
} from "react-icons/fa";
import { HiArrowLongRight } from "react-icons/hi2";
import { MdHealthAndSafety } from "react-icons/md";
import SubBanner from "../../Components/Shared/SubBanner";
import HealthRegistrationForm from "../../Components/Pagewise/HealthCampaign/HealthRegistrationForm";
import {
  formatCampaignDate,
  healthCampaigns,
  healthImpactStats,
  healthPrograms,
  type CampaignStatus,
  type HealthProgram,
} from "../../data/healthCampaigns";

const programIcons: Record<HealthProgram["iconKey"], ReactNode> = {
  camp: <FaStethoscope className="h-5 w-5" />,
  doctor: <FaUserMd className="h-5 w-5" />,
  awareness: <FaHeartbeat className="h-5 w-5" />,
  wellness: <FaLeaf className="h-5 w-5" />,
};

const statusStyles: Record<
  CampaignStatus,
  { label: string; className: string }
> = {
  upcoming: {
    label: "Upcoming",
    className:
      "bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300",
  },
  ongoing: {
    label: "Ongoing",
    className:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300",
  },
  completed: {
    label: "Completed",
    className:
      "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
  },
};

const filterTabs: { key: "all" | CampaignStatus; label: string }[] = [
  { key: "all", label: "All" },
  { key: "ongoing", label: "Ongoing" },
  { key: "upcoming", label: "Upcoming" },
  { key: "completed", label: "Completed" },
];

const HealthCampaignPage = () => {
  const [statusFilter, setStatusFilter] = useState<"all" | CampaignStatus>(
    "all",
  );

  const filteredCampaigns = useMemo(() => {
    if (statusFilter === "all") return healthCampaigns;
    return healthCampaigns.filter((c) => c.status === statusFilter);
  }, [statusFilter]);

  return (
    <div>
      <SubBanner
        title="Health Campaigns"
        subtitle="Free medical camps, doctor consultations, health awareness drives, and wellness programs – because a healthy community is a prosperous one."
        icon={<MdHealthAndSafety className="h-7 w-7 md:h-10 md:w-10" />}
      />

      {/* Impact stats */}
      <section className="border-b border-gray-100 bg-white py-10 dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 md:grid-cols-4 md:gap-8">
          {healthImpactStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-rose-600 md:text-3xl dark:text-rose-400">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Programs we run */}
      <section className="bg-slate-50 py-14 md:py-20 dark:bg-[#0b1220]">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 text-center">
            <span className="inline-block rounded-full border border-rose-100 bg-rose-50 px-4 py-1.5 text-xs font-semibold tracking-wide text-rose-700 uppercase dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300">
              What we do
            </span>
            <h2 className="mt-4 text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">
              Our health initiatives
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-500 md:text-base dark:text-gray-400">
              IGSC runs community-first health programs across Bangladesh —
              completely free or heavily subsidised for students and families in
              need.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {healthPrograms.map((program) => (
              <div
                key={program.id}
                className="group rounded-2xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:border-rose-200 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900 dark:hover:border-rose-900"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-rose-600 transition group-hover:scale-105 dark:bg-rose-950/50 dark:text-rose-300">
                  {programIcons[program.iconKey]}
                </div>
                <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                  {program.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  {program.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campaign list */}
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">
                Campaigns & camps
              </h2>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Join an upcoming camp or see what we have already delivered in
                your community.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {filterTabs.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setStatusFilter(tab.key)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    statusFilter === tab.key
                      ? "bg-rose-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {filteredCampaigns.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-200 py-16 text-center dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400">
                No campaigns in this category right now.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCampaigns.map((campaign) => {
                const badge = statusStyles[campaign.status];
                return (
                  <article
                    key={campaign.id}
                    className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
                  >
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {campaign.title}
                      </h3>
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${badge.className}`}
                      >
                        {badge.label}
                      </span>
                    </div>

                    <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                      {campaign.description}
                    </p>

                    <ul className="mb-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li className="flex items-center gap-2">
                        <FaMapMarkerAlt className="shrink-0 text-rose-500" />
                        {campaign.location}
                      </li>
                      <li className="flex items-center gap-2">
                        <FaCalendarAlt className="shrink-0 text-rose-500" />
                        {formatCampaignDate(campaign.date)}
                        {campaign.time ? ` · ${campaign.time}` : ""}
                      </li>
                      {campaign.spots ? (
                        <li className="flex items-center gap-2">
                          <FaUsers className="shrink-0 text-rose-500" />
                          Up to {campaign.spots} participants
                        </li>
                      ) : null}
                    </ul>

                    <div className="flex flex-wrap gap-1.5">
                      {campaign.services.map((service) => (
                        <span
                          key={service}
                          className="rounded-full bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-700 dark:bg-rose-950/40 dark:text-rose-300"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Registration + partner CTA */}
      <section className="bg-gradient-to-br from-rose-50 via-white to-amber-50 py-14 md:py-20 dark:from-gray-950 dark:via-gray-900 dark:to-rose-950/30">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="inline-block rounded-full border border-rose-200 bg-white px-4 py-1.5 text-xs font-semibold tracking-wide text-rose-700 uppercase dark:border-rose-900 dark:bg-gray-900 dark:text-rose-300">
              Join a camp
            </span>
            <h2 className="mt-4 text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">
              Register for a health campaign
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-500 md:text-base dark:text-gray-400">
              Fill in your details and we will confirm your spot by phone or SMS.
              All IGSC health camps are free for eligible participants.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                "Bring NID or birth certificate for verification",
                "Arrive 15 minutes before camp opening time",
                "Children under 12 must come with a guardian",
                "Follow on-site instructions from medical volunteers",
              ].map((tip) => (
                <li
                  key={tip}
                  className="flex gap-3 text-sm text-gray-600 dark:text-gray-300"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" />
                  {tip}
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-2xl border border-rose-100 bg-white/80 p-5 dark:border-rose-900/50 dark:bg-gray-900/80">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                Want to host a camp at your institution?
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Schools, colleges, and community groups can partner with IGSC to
                organise health drives on campus.
              </p>
              <Link
                to="/#partnership"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-rose-600 hover:underline dark:text-rose-400"
              >
                Partner with IGSC
                <HiArrowLongRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg md:p-8 dark:border-gray-800 dark:bg-gray-900">
            <h3 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">
              Registration form
            </h3>
            <HealthRegistrationForm campaigns={healthCampaigns} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HealthCampaignPage;
