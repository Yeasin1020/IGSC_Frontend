import { Link } from "react-router";
import {
  FaUsers,
  FaUserMd,
  FaChalkboardTeacher,
  FaBriefcase,
  FaHandsHelping,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaQuoteLeft,
} from "react-icons/fa";
import { HiArrowLongRight } from "react-icons/hi2";
import SubBanner from "../../Components/Shared/SubBanner";
import CommunityJoinForm from "../../Components/Pagewise/Community/CommunityJoinForm";
import {
  communityEvents,
  communityGroups,
  communityPillars,
  communityStats,
  featuredMembers,
  formatEventDate,
  roleLabels,
} from "../../data/community";

const pillarIcons = [
  <FaUserMd key="doc" className="h-5 w-5" />,
  <FaChalkboardTeacher key="teacher" className="h-5 w-5" />,
  <FaBriefcase key="pro" className="h-5 w-5" />,
  <FaHandsHelping key="help" className="h-5 w-5" />,
];

const eventTypeStyles = {
  meetup: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-300",
  workshop:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300",
  volunteer:
    "bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300",
};

const CommunityPage = () => {
  return (
    <div>
      <SubBanner
        title="Our Community"
        subtitle="Connect with doctors, teachers, skilled professionals, and change-makers. Together we build a supportive network for lifelong learning and growth."
        icon={<FaUsers className="h-7 w-7 md:h-10 md:w-10" />}
        bgGradient="bg-gradient-to-br from-emerald-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-900 dark:to-emerald-950/40"
      />

      {/* Stats */}
      <section className="border-b border-gray-100 bg-white py-10 dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 md:grid-cols-4 md:gap-8">
          {communityStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-emerald-600 md:text-3xl dark:text-emerald-400">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Intro */}
      <section className="py-14 md:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="inline-block rounded-full border border-emerald-100 bg-emerald-50 px-4 py-1.5 text-xs font-semibold tracking-wide text-emerald-700 uppercase dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300">
              Together we grow
            </span>
            <h2 className="mt-4 text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">
              A network built on{" "}
              <span className="text-emerald-600 dark:text-emerald-400">
                learning, mentoring, and giving back
              </span>
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-gray-600 md:text-base dark:text-gray-300">
              IGSC is more than courses and services — it is a living community
              of students, educators, doctors, and professionals who support
              each other. Join study groups, attend meetups, volunteer at health
              camps, or mentor the next generation.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-gray-600 md:text-base dark:text-gray-300">
              Whether you are preparing for IELTS, learning to code, or looking
              to contribute your skills — there is a place for you here.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {communityPillars.map((pillar, index) => (
              <div
                key={pillar.id}
                className="rounded-lg border border-gray-200 bg-white p-5 transition hover:border-emerald-200 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-emerald-900"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-300">
                  {pillarIcons[index]}
                </div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured members */}
      <section className="bg-slate-50 py-14 md:py-20 dark:bg-[#0b1220]">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 text-center">
            <span className="inline-block rounded-full border border-emerald-100 bg-white px-4 py-1.5 text-xs font-semibold tracking-wide text-emerald-700 uppercase dark:border-emerald-900 dark:bg-gray-900 dark:text-emerald-300">
              People of IGSC
            </span>
            <h2 className="mt-4 text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">
              Meet our mentors & members
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-500 md:text-base dark:text-gray-400">
              Real people driving real change — from health volunteers to coding
              mentors and student leaders.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredMembers.map((member) => (
              <article
                key={member.id}
                className="flex flex-col rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {member.name}
                    </h3>
                    <p className="text-sm text-emerald-600 dark:text-emerald-400">
                      {member.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {member.organization}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
                    {roleLabels[member.role]}
                  </span>
                </div>

                <div className="relative mb-4 flex-1 rounded-xl bg-gray-50 p-4 dark:bg-gray-950">
                  <FaQuoteLeft className="absolute top-3 left-3 h-3 w-3 text-emerald-300 dark:text-emerald-800" />
                  <p className="pl-5 text-sm italic leading-relaxed text-gray-600 dark:text-gray-300">
                    {member.quote}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {member.expertise.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Groups */}
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">
                Community groups
              </h2>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Find your tribe — study circles, volunteer teams, and skill
                groups open to all IGSC members.
              </p>
            </div>
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:underline dark:text-emerald-400"
            >
              Start with a course
              <HiArrowLongRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {communityGroups.map((group) => (
              <div
                key={group.id}
                className="rounded-lg border border-gray-200 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-xs font-semibold text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-300">
                    {group.category}
                  </span>
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    {group.members}+ members
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {group.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  {group.description}
                </p>
                <p className="mt-4 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  {group.meeting}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="border-t border-gray-100 bg-slate-50 py-14 md:py-20 dark:border-gray-800 dark:bg-[#0b1220]">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">
              Upcoming events
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-gray-500 dark:text-gray-400">
              Meetups, workshops, and volunteer orientations — open to everyone.
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-5">
            {communityEvents.map((event) => (
              <article
                key={event.id}
                className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6 sm:flex-row sm:items-center dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${eventTypeStyles[event.type]}`}
                    >
                      {event.type}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {event.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {event.description}
                  </p>
                </div>
                <div className="shrink-0 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <p className="flex items-center gap-2">
                    <FaCalendarAlt className="text-emerald-500" />
                    {formatEventDate(event.date)} · {event.time}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-emerald-500" />
                    {event.location}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Join form */}
      <section className="bg-gradient-to-br from-emerald-50 via-white to-cyan-50 py-14 md:py-20 dark:from-gray-950 dark:via-gray-900 dark:to-emerald-950/30">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="inline-block rounded-full border border-emerald-200 bg-white px-4 py-1.5 text-xs font-semibold tracking-wide text-emerald-700 uppercase dark:border-emerald-900 dark:bg-gray-900 dark:text-emerald-300">
              Get involved
            </span>
            <h2 className="mt-4 text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">
              Join the IGSC community
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-500 md:text-base dark:text-gray-400">
              Tell us how you would like to participate — as a learner, mentor,
              volunteer, or partner. We will connect you with the right group
              within a few days.
            </p>

            <ul className="mt-8 space-y-4">
              {[
                "Free to join — no membership fee",
                "Open to students, professionals, and institutions",
                "Online and in-person activities across Dhaka",
                "Volunteer hours recognised with a certificate",
              ].map((tip) => (
                <li
                  key={tip}
                  className="flex gap-3 text-sm text-gray-600 dark:text-gray-300"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                  {tip}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/health-campaign"
                className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:underline dark:text-emerald-400"
              >
                Volunteer for health camps
                <HiArrowLongRight className="h-4 w-4" />
              </Link>
              <Link
                to="/#partnership"
                className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-600 hover:underline dark:text-cyan-400"
              >
                Institution partnership
                <HiArrowLongRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-lg md:p-8 dark:border-gray-800 dark:bg-gray-900">
            <h3 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">
              Community join form
            </h3>
            <CommunityJoinForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default CommunityPage;
