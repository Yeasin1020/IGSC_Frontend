import {
  FaBullseye,
  FaSeedling,
  FaAward,
  FaHeart,
  FaCheck,
} from "react-icons/fa";
import { HiArrowLongRight } from "react-icons/hi2";
import { Link } from "react-router";

const WhyChooseIGSC = () => {
  const featureBlocks = [
    {
      icon: <FaBullseye size={18} />,
      title: "Outcome-Focused",
      description:
        "Every program is designed around practical and measurable real-world impact.",
    },
    {
      icon: <FaSeedling size={18} />,
      title: "Community-Rooted",
      description:
        "Built specifically for students, institutions, and communities across Bangladesh.",
    },
    {
      icon: <FaAward size={18} />,
      title: "Certified & Recognized",
      description:
        "Programs aligned with globally relevant skills and recognized credentials.",
    },
    {
      icon: <FaHeart size={18} />,
      title: "Accessible Learning",
      description:
        "Affordable and inclusive initiatives designed to reduce learning barriers.",
    },
  ];

  const highlights = [
    {
      title: "No prerequisites required",
      description:
        "Open for motivated learners from every educational background.",
      color: "blue",
    },
    {
      title: "Industry & academic experts",
      description:
        "Programs led by experienced facilitators and field professionals.",
      color: "emerald",
    },
    {
      title: "Flexible learning delivery",
      description:
        "On-campus, hybrid, or institution-based delivery tailored to your needs.",
      color: "amber",
    },
  ];

  return (
    <section className="w-full bg-slate-50 py-16 sm:py-20 lg:py-24 dark:bg-[#0b1220]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          {/* LEFT SIDE */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {featureBlocks.map((item, index) => (
              <div
                key={item.title}
                className={`group rounded-lg border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md sm:p-6 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-blue-900 ${
                  index >= 2 ? "sm:col-span-2" : ""
                }`}
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-300">
                  {item.icon}
                </div>
                <h3 className="mb-2 text-[1rem] font-semibold text-slate-900 sm:text-[1.05rem] dark:text-white">
                  {item.title}
                </h3>
                <p className="text-sm leading-7 text-slate-500 dark:text-slate-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div>
            <div className="mb-5 inline-flex items-center rounded-md border border-blue-100 bg-blue-50 px-3 py-1.5 text-[11px] font-semibold tracking-[0.14em] text-blue-700 uppercase dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-300">
              Why IGSC
            </div>

            <h2 className="max-w-xl text-[2rem] leading-[1.15] font-semibold tracking-[-0.03em] text-slate-900 sm:text-[2.5rem] lg:text-[3rem] dark:text-white">
              Built for students who{" "}
              <span className="text-blue-600 dark:text-blue-400">
                truly want to grow
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-[0.96rem] leading-8 text-slate-500 sm:text-base dark:text-slate-400">
              Every initiative is thoughtfully designed with educators,
              professionals, and institutions to create practical learning
              experiences that deliver meaningful outcomes.
            </p>

            <div className="mt-9 space-y-6">
              {highlights.map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div
                    className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${
                      item.color === "blue"
                        ? "bg-blue-100 text-blue-600 dark:bg-blue-950/60 dark:text-blue-300"
                        : item.color === "emerald"
                          ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-300"
                          : "bg-amber-100 text-amber-600 dark:bg-amber-950/60 dark:text-amber-300"
                    }`}
                  >
                    <FaCheck size={10} />
                  </div>
                  <div>
                    <h4 className="mb-1 text-[1rem] font-semibold text-slate-800 dark:text-slate-100">
                      {item.title}
                    </h4>
                    <p className="text-sm leading-7 text-slate-500 dark:text-slate-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Link to="/courses">
                <button className="group inline-flex items-center gap-2 rounded-md bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700">
                  Start Learning
                  <HiArrowLongRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseIGSC;
