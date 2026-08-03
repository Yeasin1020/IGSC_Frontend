export type CampaignStatus = "upcoming" | "ongoing" | "completed";

export interface HealthProgram {
  id: string;
  title: string;
  description: string;
  iconKey: "camp" | "doctor" | "awareness" | "wellness";
}

export interface HealthCampaign {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  time?: string;
  status: CampaignStatus;
  services: string[];
  spots?: number;
}

export const healthImpactStats = [
  { label: "Patients served", value: "1,200+" },
  { label: "Free camps held", value: "45+" },
  { label: "Volunteer doctors", value: "28" },
  { label: "Communities reached", value: "12" },
];

export const healthPrograms: HealthProgram[] = [
  {
    id: "medical-camp",
    title: "Free Medical Camps",
    description:
      "On-site general check-ups, basic diagnostics, and medicine support for underserved communities.",
    iconKey: "camp",
  },
  {
    id: "doctor-consult",
    title: "Doctor Consultations",
    description:
      "Specialist and general physician sessions — free or low-cost — with follow-up guidance.",
    iconKey: "doctor",
  },
  {
    id: "awareness",
    title: "Health Awareness Drives",
    description:
      "Workshops on hygiene, nutrition, maternal health, diabetes, and preventable diseases.",
    iconKey: "awareness",
  },
  {
    id: "wellness",
    title: "Wellness Programs",
    description:
      "Fitness, mental wellness, and lifestyle sessions for students, workers, and families.",
    iconKey: "wellness",
  },
];

export const healthCampaigns: HealthCampaign[] = [
  {
    id: "eye-camp-mirpur",
    title: "Free Eye Check-up Camp",
    description:
      "Vision screening, free spectacles for eligible patients, and referral support for surgery cases.",
    location: "Mirpur, Dhaka",
    date: "2026-08-15",
    time: "9:00 AM – 4:00 PM",
    status: "upcoming",
    services: ["Eye test", "Free glasses", "Doctor consultation"],
    spots: 200,
  },
  {
    id: "diabetes-uttara",
    title: "Diabetes Screening Drive",
    description:
      "Blood sugar testing, diet counselling, and awareness session on managing diabetes at home.",
    location: "Uttara, Dhaka",
    date: "2026-08-22",
    time: "10:00 AM – 3:00 PM",
    status: "upcoming",
    services: ["Blood sugar test", "Nutrition talk", "Free booklet"],
    spots: 150,
  },
  {
    id: "womens-health-banani",
    title: "Women's Health Awareness",
    description:
      "Sessions on maternal care, anemia prevention, and free basic health screening for women.",
    location: "Banani, Dhaka",
    date: "2026-09-05",
    time: "11:00 AM – 5:00 PM",
    status: "upcoming",
    services: ["Health talk", "Basic screening", "Q&A with doctors"],
    spots: 120,
  },
  {
    id: "dental-dhanmondi",
    title: "Dental Care Camp",
    description:
      "Free dental check-ups, oral hygiene kits, and guidance for children and adults.",
    location: "Dhanmondi, Dhaka",
    date: "2026-07-20",
    time: "9:00 AM – 2:00 PM",
    status: "completed",
    services: ["Dental check-up", "Oral hygiene kit", "Awareness session"],
  },
  {
    id: "general-mohammadpur",
    title: "Community General Health Camp",
    description:
      "BP, BMI, blood group, and general physician consultation for local residents.",
    location: "Mohammadpur, Dhaka",
    date: "2026-08-03",
    time: "8:00 AM – 1:00 PM",
    status: "ongoing",
    services: ["BP check", "BMI", "General doctor"],
    spots: 180,
  },
];

export const formatCampaignDate = (isoDate: string) =>
  new Date(isoDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
