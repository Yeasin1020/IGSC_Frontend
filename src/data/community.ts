export type MemberRole =
  | "doctor"
  | "teacher"
  | "professional"
  | "volunteer"
  | "student";

export interface CommunityMember {
  id: string;
  name: string;
  role: MemberRole;
  title: string;
  organization: string;
  quote: string;
  expertise: string[];
}

export interface CommunityGroup {
  id: string;
  name: string;
  description: string;
  members: number;
  category: string;
  meeting: string;
}

export interface CommunityEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: "meetup" | "workshop" | "volunteer";
}

export const communityStats = [
  { value: "2,500+", label: "Community members" },
  { value: "120+", label: "Mentors & volunteers" },
  { value: "35+", label: "Partner institutions" },
  { value: "18+", label: "Active groups" },
];

export const communityPillars = [
  {
    id: "doctors",
    title: "Doctors & Health Volunteers",
    description:
      "Medical professionals who support free camps, awareness sessions, and community wellness drives.",
  },
  {
    id: "teachers",
    title: "Teachers & Educators",
    description:
      "School and college teachers mentoring students through IGSC courses and campus programs.",
  },
  {
    id: "professionals",
    title: "Skilled Professionals",
    description:
      "Developers, designers, marketers, and consultants sharing real-world knowledge with learners.",
  },
  {
    id: "changemakers",
    title: "Student Changemakers",
    description:
      "Young leaders who organise study circles, peer support, and local community initiatives.",
  },
];

export const featuredMembers: CommunityMember[] = [
  {
    id: "m1",
    name: "Dr. Farhana Islam",
    role: "doctor",
    title: "General Physician",
    organization: "IGSC Health Volunteer Network",
    quote:
      "Serving at IGSC camps showed me how much impact a few hours of free care can have.",
    expertise: ["Health camps", "Women's health", "Awareness"],
  },
  {
    id: "m2",
    name: "Rafiq Hasan",
    role: "professional",
    title: "Senior Full-Stack Engineer",
    organization: "Tech mentor · IGSC",
    quote:
      "I mentor because someone once mentored me — now I pay it forward every week.",
    expertise: ["Web development", "React", "Career guidance"],
  },
  {
    id: "m3",
    name: "Sarah Ahmed",
    role: "teacher",
    title: "English Language Trainer",
    organization: "City College Dhaka",
    quote:
      "Our spoken English club grew from 12 students to over 80 in one semester.",
    expertise: ["Spoken English", "IELTS", "Public speaking"],
  },
  {
    id: "m4",
    name: "Nadia Rahman",
    role: "volunteer",
    title: "Community Coordinator",
    organization: "IGSC Volunteer Corps",
    quote:
      "Connecting students with mentors is the most rewarding work I have done.",
    expertise: ["Events", "Outreach", "Student support"],
  },
  {
    id: "m5",
    name: "Karim Student",
    role: "student",
    title: "HSC Candidate",
    organization: "Web Dev Learners Hub",
    quote:
      "The study group helped me finish my first portfolio project before college admission.",
    expertise: ["JavaScript", "Study groups", "Peer learning"],
  },
  {
    id: "m6",
    name: "Mahbub Alam",
    role: "professional",
    title: "Digital Marketing Lead",
    organization: "Growth mentor · IGSC",
    quote:
      "Students here don't just learn theory — they run real campaigns for local businesses.",
    expertise: ["SEO", "Social ads", "Analytics"],
  },
];

export const communityGroups: CommunityGroup[] = [
  {
    id: "ielts-circle",
    name: "IELTS Study Circle",
    description:
      "Weekly speaking practice, mock tests, and peer feedback for IELTS candidates.",
    members: 340,
    category: "Education",
    meeting: "Every Fri, 6 PM · Online & campus",
  },
  {
    id: "web-dev-hub",
    name: "Web Dev Learners Hub",
    description:
      "Beginner-friendly coding sessions, project reviews, and job-prep discussions.",
    members: 520,
    category: "Technology",
    meeting: "Sat & Tue, 7 PM · Hybrid",
  },
  {
    id: "spoken-club",
    name: "Spoken English Club",
    description:
      "Confidence-building conversations, debates, and interview practice in English.",
    members: 410,
    category: "Language",
    meeting: "Sun, Tue, Thu · 6 PM",
  },
  {
    id: "health-volunteers",
    name: "Health Volunteers Network",
    description:
      "Doctors, nurses, and volunteers coordinating free health camps across Dhaka.",
    members: 85,
    category: "Health",
    meeting: "Monthly orientation · 1st Saturday",
  },
  {
    id: "design-circle",
    name: "Design & Creativity Circle",
    description:
      "UI/UX tips, portfolio reviews, and Canva/Figma workshops for aspiring designers.",
    members: 190,
    category: "Design",
    meeting: "Wed, 5 PM · Online",
  },
  {
    id: "career-network",
    name: "Career Readiness Network",
    description:
      "CV clinics, mock interviews, and industry talks for students entering the job market.",
    members: 275,
    category: "Career",
    meeting: "Last Sat of month · 11 AM",
  },
];

export const communityEvents: CommunityEvent[] = [
  {
    id: "e1",
    title: "Monthly Community Meetup",
    description:
      "Open networking for students, mentors, and volunteers — share ideas and find collaborators.",
    date: "2026-08-09",
    time: "4:00 PM – 7:00 PM",
    location: "IGSC Campus, Dhaka",
    type: "meetup",
  },
  {
    id: "e2",
    title: "Volunteer Orientation 2026",
    description:
      "New volunteers learn how IGSC programs work and pick a team: health, education, or events.",
    date: "2026-08-16",
    time: "10:00 AM – 1:00 PM",
    location: "Online (Zoom)",
    type: "volunteer",
  },
  {
    id: "e3",
    title: "Career Talk: From Student to Professional",
    description:
      "Panel with IGSC alumni working in tech, marketing, and healthcare sharing their journeys.",
    date: "2026-08-23",
    time: "6:00 PM – 8:00 PM",
    location: "Banani Community Hall",
    type: "workshop",
  },
];

export const joinInterests = [
  "Join a study group",
  "Become a mentor",
  "Volunteer for health camps",
  "Help with events",
  "Institution collaboration",
  "General networking",
];

export const formatEventDate = (isoDate: string) =>
  new Date(isoDate).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export const roleLabels: Record<MemberRole, string> = {
  doctor: "Health",
  teacher: "Education",
  professional: "Professional",
  volunteer: "Volunteer",
  student: "Student",
};
