import { Link } from "react-router";
import {
  FaGraduationCap,
  FaHandshake,
  FaHeart,
  FaLightbulb,
} from "react-icons/fa";
import { FiInfo } from "react-icons/fi";
import { HiArrowLongRight } from "react-icons/hi2";
import SubBanner from "../../Components/Shared/SubBanner";
import MissionAndVision from "../../Components/Pagewise/HomePage/MissionAndVision";
import {
  aboutStats,
  coreValues,
  milestones,
  whatWeDo,
} from "../../data/aboutUs";

const valueIcons = [
  <FaHeart key="heart" className="h-5 w-5" />,
  <FaGraduationCap key="grad" className="h-5 w-5" />,
  <FaLightbulb key="bulb" className="h-5 w-5" />,
  <FaHandshake key="hand" className="h-5 w-5" />,
];

const AboutUsPage = () => {
  return (
    <div>
      <SubBanner
        title="About Us"
        subtitle="Institute of Global Skills and Communication — building a skilled, self-reliant, and dignified society through education, technology, and compassion."
        icon={<FiInfo className="h-7 w-7 md:h-10 md:w-10" />}
      />

      {/* Stats */}
      <section className="border-b border-gray-100 bg-white py-10 dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 md:grid-cols-4 md:gap-8">
          {aboutStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-indigo-600 md:text-3xl dark:text-indigo-400">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Who we are */}
      <section className="py-14 md:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="inline-block rounded-full border border-indigo-100 bg-indigo-50 px-4 py-1.5 text-xs font-semibold tracking-wide text-indigo-700 uppercase dark:border-indigo-900 dark:bg-indigo-950/40 dark:text-indigo-300">
              Who we are
            </span>
            <h2 className="mt-4 text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">
              More than an institute — a movement for{" "}
              <span className="text-indigo-600 dark:text-indigo-400">
                equal opportunity
              </span>
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-gray-600 md:text-base dark:text-gray-300">
              <p>
                The <strong>Institute of Global Skills and Communication (IGSC)</strong>{" "}
                is a Bangladesh-based organisation dedicated to closing the gap
                between talent and opportunity. We combine modern education,
                practical skill training, professional services, and community
                health initiatives under one roof.
              </p>
              <p>
                From free courses in web development and IELTS preparation to
                health camps in local neighbourhoods, everything we do is
                designed to help students, workers, and institutions grow with
                confidence — regardless of background or budget.
              </p>
              <p>
                Our work is rooted in humanitarian values: food, clothing,
                shelter, health, education, and employment for a dignified life.
                That is the promise behind every program we run.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-indigo-100 to-purple-100 opacity-60 blur-2xl dark:from-indigo-950/40 dark:to-purple-950/40" />
            <div className="relative rounded-2xl border border-gray-200 bg-white p-8 shadow-xl dark:border-gray-800 dark:bg-gray-900">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                What drives us
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                IGSC exists because too many capable people are held back — not
                by lack of ambition, but by lack of access. We partner with
                educators, doctors, technologists, and institutions to change
                that story, one learner and one community at a time.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Free and low-cost learning for students",
                  "Industry-relevant skills with real outcomes",
                  "Community health programs at zero cost",
                  "Campus partnerships across Bangladesh",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300"
                  >
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-indigo-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision — reused from homepage */}
      <MissionAndVision />

      {/* Core values */}
      <section className="bg-slate-50 py-14 md:py-20 dark:bg-[#0b1220]">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 text-center">
            <span className="inline-block rounded-full border border-indigo-100 bg-white px-4 py-1.5 text-xs font-semibold tracking-wide text-indigo-700 uppercase dark:border-indigo-900 dark:bg-gray-900 dark:text-indigo-300">
              Our values
            </span>
            <h2 className="mt-4 text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">
              Principles we never compromise on
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {coreValues.map((value, index) => (
              <div
                key={value.title}
                className="rounded-2xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-300">
                  {valueIcons[index]}
                </div>
                <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">
              What we offer
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-500 md:text-base dark:text-gray-400">
              Four pillars of impact — explore each area of the IGSC ecosystem.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {whatWeDo.map((item) => (
              <div
                key={item.title}
                className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-6 transition hover:border-indigo-200 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-indigo-900"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                  {item.description}
                </p>
                <Link
                  to={item.link}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition group-hover:gap-3 dark:text-indigo-400"
                >
                  {item.linkLabel}
                  <HiArrowLongRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-t border-gray-100 bg-slate-50 py-14 md:py-20 dark:border-gray-800 dark:bg-[#0b1220]">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-10 text-center">
            <span className="inline-block rounded-full border border-indigo-100 bg-white px-4 py-1.5 text-xs font-semibold tracking-wide text-indigo-700 uppercase dark:border-indigo-900 dark:bg-gray-900 dark:text-indigo-300">
              Our journey
            </span>
            <h2 className="mt-4 text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">
              Milestones along the way
            </h2>
          </div>

          <div className="relative mx-auto max-w-3xl">
            <div className="absolute top-0 bottom-0 left-4 w-px bg-indigo-200 md:left-1/2 md:-translate-x-px dark:bg-indigo-900" />

            <div className="space-y-10">
              {milestones.map((item, index) => (
                <div
                  key={item.year}
                  className={`relative flex flex-col gap-4 md:flex-row md:items-center ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className="hidden flex-1 md:block" />
                  <div className="absolute left-4 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-2 border-indigo-500 bg-white text-xs font-bold text-indigo-600 md:left-1/2 dark:bg-gray-900 dark:text-indigo-400">
                    •
                  </div>
                  <div className="flex-1 pl-12 md:pl-0">
                    <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
                      <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                        {item.year}
                      </span>
                      <h3 className="mt-1 font-semibold text-gray-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 py-14 md:py-16">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            Ready to grow with IGSC?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-indigo-100 md:text-base">
            Enroll in a free course, request a service, join a health camp, or
            bring our programs to your institution.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/courses"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50"
            >
              Explore courses
            </Link>
            <Link
              to="/#partnership"
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Partner with us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
