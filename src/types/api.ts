export type UserRole = "superAdmin" | "admin" | "user";
export type CategoryType = "course" | "service";

export interface ApiMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  meta?: ApiMeta;
  data: T;
}

export interface ApiErrorBody {
  success: false;
  statusCode: number;
  message: string;
  errorSources?: { path: string | number; message: string }[];
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  avatar?: string;
  role: UserRole;
  status: "active" | "blocked";
  isAutoCreated?: boolean;
  createdAt?: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  type: CategoryType;
  description?: string;
  icon?: string;
  image?: string;
  isActive: boolean;
  serial: number;
  itemCount?: number;
}

export interface SyllabusModule {
  title: string;
  topics: string[];
}

export interface Instructor {
  name: string;
  designation?: string;
  photo?: string;
  bio?: string;
}

export interface Course {
  _id: string;
  title: string;
  slug: string;
  category: Category | string;
  shortDescription: string;
  description?: string;
  thumbnail?: string;
  price: number;
  discountPrice?: number;
  duration?: string;
  level: "beginner" | "intermediate" | "advanced" | "all-levels";
  language?: string;
  startDate?: string;
  schedule?: string;
  seats: number;
  totalEnrolled: number;
  syllabus: SyllabusModule[];
  instructor?: Instructor;
  requirements: string[];
  outcomes: string[];
  isPublished: boolean;
  isPopular: boolean;
  isNew: boolean;
  rating: number;
}

export interface Service {
  _id: string;
  title: string;
  slug: string;
  category: Category | string;
  description: string;
  fullDescription?: string;
  price: number;
  features: string[];
  image?: string;
  iconKey?: string;
  deliveryTime?: string;
  isPublished: boolean;
  isPopular: boolean;
  isNew: boolean;
  rating: number;
  totalOrders: number;
}

export interface Testimonial {
  _id: string;
  name: string;
  rating: number;
  message: string;
  profession?: string;
  institute?: string;
  avatar?: string;
  isApproved?: boolean;
  serial?: number;
}

export interface Enrollment {
  _id: string;
  enrollmentId: string;
  course: Course | string;
  courseSnapshot: { title: string; slug: string; price: number };
  user: User | string;
  applicant: {
    name: string;
    email: string;
    phone: string;
    address?: string;
    education?: string;
    institute?: string;
  };
  note?: string;
  status: "pending" | "approved" | "enrolled" | "completed" | "rejected" | "cancelled";
  paymentStatus: "free" | "unpaid" | "paid";
  adminNote?: string;
  createdAt?: string;
}

export interface ServiceRequest {
  _id: string;
  requestId: string;
  service: Service | string;
  serviceSnapshot: { title: string; slug: string; price: number };
  user: User | string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address?: string;
    company?: string;
  };
  requirements?: string;
  preferredDeadline?: string;
  status: "pending" | "in-review" | "in-progress" | "completed" | "cancelled";
  adminNote?: string;
  createdAt?: string;
}

export interface DashboardStats {
  totals: {
    courses: number;
    services: number;
    categories: number;
    users: number;
    enrollments: number;
    serviceRequests: number;
  };
  actionRequired: {
    pendingEnrollments: number;
    pendingServiceRequests: number;
    newPartnerships: number;
    unapprovedTestimonials: number;
  };
  enrollmentsByStatus: Record<string, number>;
  serviceRequestsByStatus: Record<string, number>;
  recentEnrollments: Enrollment[];
  recentServiceRequests: ServiceRequest[];
  topCourses: Course[];
  monthlyEnrollments: { year: number; month: number; count: number }[];
}

export interface StudentDashboardStats {
  totals: {
    enrollments: number;
    serviceRequests: number;
  };
  enrollmentsByStatus: Record<string, number>;
  serviceRequestsByStatus: Record<string, number>;
  recentEnrollments: Enrollment[];
  recentServiceRequests: ServiceRequest[];
}

export interface AuthPayload {
  accessToken: string;
  refreshToken?: string;
  needsPasswordChange?: boolean;
  user: User;
}

export interface EnrollmentResult {
  enrollment: Enrollment;
  isNewAccount: boolean;
  accountAlreadyExisted: boolean;
  accessToken?: string;
  refreshToken?: string;
}

export interface ServiceRequestResult {
  serviceRequest: ServiceRequest;
  isNewAccount: boolean;
  accountAlreadyExisted: boolean;
  accessToken?: string;
  refreshToken?: string;
}
