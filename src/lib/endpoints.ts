import { api } from "./api";
import type {
  AuthPayload,
  Category,
  CategoryType,
  Course,
  DashboardStats,
  Enrollment,
  EnrollmentResult,
  Service,
  ServiceRequest,
  ServiceRequestResult,
  StudentDashboardStats,
  Testimonial,
  User,
} from "../types/api";

type Query = Record<string, string | number | boolean | undefined | null>;

/** Centralised API paths — keep in sync with backend `/api/v1` routes. */
export const paths = {
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
    changePassword: "/auth/change-password",
    forgetPassword: "/auth/forget-password",
    resetPassword: "/auth/reset-password",
  },
  users: {
    me: "/users/me",
    list: "/users",
    status: (id: string) => `/users/${id}/status`,
  },
  categories: {
    list: "/categories",
    one: (id: string) => `/categories/${id}`,
  },
  courses: {
    list: "/courses",
    one: (idOrSlug: string) => `/courses/${idOrSlug}`,
  },
  services: {
    list: "/services",
    one: (idOrSlug: string) => `/services/${idOrSlug}`,
  },
  enrollments: {
    list: "/enrollments",
    my: "/enrollments/my",
    one: (id: string) => `/enrollments/${id}`,
    cancel: (id: string) => `/enrollments/${id}/cancel`,
  },
  serviceRequests: {
    list: "/service-requests",
    my: "/service-requests/my",
    one: (id: string) => `/service-requests/${id}`,
    cancel: (id: string) => `/service-requests/${id}/cancel`,
  },
  testimonials: {
    list: "/testimonials",
    one: (id: string) => `/testimonials/${id}`,
  },
  partnership: {
    create: "/partnership",
    list: "/partnership",
  },
  meta: {
    dashboard: "/meta/dashboard-stats",
    myDashboard: "/meta/my-dashboard-stats",
  },
} as const;

export const authApi = {
  login: (body: { email: string; password: string }) =>
    api.post<AuthPayload>(paths.auth.login, body),
  logout: () => api.post(paths.auth.logout),
};

export const usersApi = {
  me: () => api.get<User>(paths.users.me),
  list: (query?: Query) => api.get<User[]>(paths.users.list, query),
  updateStatus: (id: string, status: "active" | "blocked") =>
    api.patch(paths.users.status(id), { status }),
};

export const categoriesApi = {
  list: (query?: Query & { type?: CategoryType }) =>
    api.get<Category[]>(paths.categories.list, query),
  create: (body: unknown) => api.post(paths.categories.list, body),
  update: (id: string, body: unknown) =>
    api.patch(paths.categories.one(id), body),
  remove: (id: string) => api.delete(paths.categories.one(id)),
};

export const coursesApi = {
  list: (query?: Query) => api.get<Course[]>(paths.courses.list, query),
  get: (idOrSlug: string) => api.get<Course>(paths.courses.one(idOrSlug)),
  create: (body: unknown) => api.post(paths.courses.list, body),
  update: (id: string, body: unknown) =>
    api.patch(paths.courses.one(id), body),
  remove: (id: string) => api.delete(paths.courses.one(id)),
};

export const servicesApi = {
  list: (query?: Query) => api.get<Service[]>(paths.services.list, query),
  get: (idOrSlug: string) => api.get<Service>(paths.services.one(idOrSlug)),
  create: (body: unknown) => api.post(paths.services.list, body),
  update: (id: string, body: unknown) =>
    api.patch(paths.services.one(id), body),
  remove: (id: string) => api.delete(paths.services.one(id)),
};

export const enrollmentsApi = {
  list: (query?: Query) =>
    api.get<Enrollment[]>(paths.enrollments.list, query),
  my: (query?: Query) =>
    api.get<Enrollment[]>(paths.enrollments.my, query),
  create: (body: unknown) =>
    api.post<EnrollmentResult>(paths.enrollments.list, body),
  update: (id: string, body: unknown) =>
    api.patch(paths.enrollments.one(id), body),
  cancel: (id: string) => api.patch(paths.enrollments.cancel(id)),
};

export const serviceRequestsApi = {
  list: (query?: Query) =>
    api.get<ServiceRequest[]>(paths.serviceRequests.list, query),
  my: (query?: Query) =>
    api.get<ServiceRequest[]>(paths.serviceRequests.my, query),
  create: (body: unknown) =>
    api.post<ServiceRequestResult>(paths.serviceRequests.list, body),
  update: (id: string, body: unknown) =>
    api.patch(paths.serviceRequests.one(id), body),
  cancel: (id: string) => api.patch(paths.serviceRequests.cancel(id)),
};

export const testimonialsApi = {
  list: (query?: Query) =>
    api.get<Testimonial[]>(paths.testimonials.list, query),
};

export const partnershipApi = {
  create: (body: unknown) => api.post(paths.partnership.create, body),
};

export const metaApi = {
  dashboard: () => api.get<DashboardStats>(paths.meta.dashboard),
  myDashboard: () => api.get<StudentDashboardStats>(paths.meta.myDashboard),
};
