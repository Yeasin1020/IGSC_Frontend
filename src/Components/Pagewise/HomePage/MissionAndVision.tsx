import { FiTarget, FiEye } from "react-icons/fi";

const MissionAndVision = () => {
  return (
    <section className="relative overflow-x-clip bg-gradient-to-br from-slate-50 via-white to-indigo-50/50 py-10 sm:py-12 md:py-20 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950/40">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-indigo-200/40 blur-3xl dark:bg-indigo-500/10" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-teal-200/40 blur-3xl dark:bg-teal-500/10" />
        <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-100/30 blur-3xl dark:bg-amber-500/5" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex justify-center">
          <span className="inline-block rounded-md border border-indigo-100 bg-white/80 px-3 py-1 text-xs font-semibold tracking-wide text-indigo-600 uppercase dark:border-indigo-800 dark:bg-gray-900/80 dark:text-indigo-300">
            Our Guiding Principles
          </span>
        </div>

        <div className="mb-10 text-center md:mb-12">
          <h2 className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl dark:from-white dark:to-slate-300">
            Mission & Vision 2035
          </h2>
          <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-indigo-500 to-teal-500" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          <div className="group relative rounded-lg border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700 dark:bg-gray-900">
            <div className="absolute inset-x-0 top-0 h-1 rounded-t-lg bg-indigo-500" />
            <div className="p-5 md:p-7">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-md bg-indigo-600 text-white">
                <FiTarget className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-2xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-slate-800 to-slate-700 bg-clip-text text-transparent dark:from-white dark:to-slate-300">
                  Our Mission
                </span>
              </h3>
              <div className="mb-4 h-px w-10 bg-gradient-to-r from-indigo-400 to-transparent" />
              <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">
                To ensure food, clothing, shelter, health, education, and
                employment opportunities through skill development, modern
                education, technology, and humanitarian values in order to build
                a skilled, self-reliant, and dignified society.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "Food",
                  "Clothing",
                  "Shelter",
                  "Health",
                  "Education",
                  "Employment",
                ].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center rounded-md border border-indigo-100 bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950/50 dark:text-indigo-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="group relative rounded-lg border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-700 dark:bg-gray-900">
            <div className="absolute inset-x-0 top-0 h-1 rounded-t-lg bg-teal-500" />
            <div className="p-5 md:p-7">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-md bg-teal-600 text-white">
                <FiEye className="h-5 w-5" />
              </div>
              <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-2xl font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-slate-800 to-slate-700 bg-clip-text text-transparent dark:from-white dark:to-slate-300">
                    Our Vision
                  </span>
                </h3>
                <span className="inline-flex items-center rounded-md border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700 dark:border-amber-700 dark:bg-amber-950/40 dark:text-amber-300">
                  2035
                </span>
              </div>
              <div className="mb-4 h-px w-10 bg-gradient-to-r from-teal-400 to-transparent" />
              <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">
                To build a modern, educated, compassionate, and technology-driven
                society by 2035, where everyone has equal access to basic needs,
                education, healthcare, and employment opportunities for a
                dignified and self-dependent life.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  "Modern",
                  "Educated",
                  "Compassionate",
                  "Tech-Driven",
                  "Equal Access",
                  "Self-Dependent",
                ].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center rounded-md border border-teal-100 bg-teal-50 px-2 py-0.5 text-xs font-medium text-teal-700 dark:border-teal-800 dark:bg-teal-950/40 dark:text-teal-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="flex items-center justify-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <span className="inline-block h-px w-8 bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-600" />
            Building a skilled, self-reliant, and dignified society
            <span className="inline-block h-px w-8 bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-600" />
          </p>
        </div>
      </div>
    </section>
  );
};

export default MissionAndVision;
