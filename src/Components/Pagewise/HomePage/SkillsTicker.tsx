import { motion } from "framer-motion";

const items = [
  "🎓 Communication Skills",
  "🌍 Global Competency",
  "🩺 Health Awareness",
  "💼 Career Readiness",
  "🤝 Institutional Collaboration",
  "📊 Digital Literacy",
  "🧠 Critical Thinking",
  "🗣️ Public Speaking",
];

const SkillsTicker = () => {
  const duplicated = [...items, ...items];

  return (
    <div className="relative w-full overflow-hidden border-y border-white/10 bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 py-3">
      
      {/* Left fade */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-linear-to-r from-slate-900 to-transparent z-10" />

      {/* Right fade */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-linear-to-l from-slate-900 to-transparent z-10" />

      <motion.div
        className="flex w-max items-center gap-8"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 22,
        }}
      >
        {duplicated.map((text, i) => (
          <div
            key={i}
            className="flex items-center gap-3 whitespace-nowrap"
          >
            <span className="text-sm sm:text-[0.95rem] font-medium text-white/80 tracking-wide">
              {text}
            </span>

            <span className="w-1.5 h-1.5 rounded-full bg-blue-400/60" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default SkillsTicker;