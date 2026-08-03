import type { ReactNode } from "react";

export type { Course, Service, Testimonial, Category, User } from "../types/api";

/** @deprecated Prefer Service from types/api — kept for older card props */
export interface IService {
  id?: string;
  _id?: string;
  title: string;
  description: string;
  fullDescription?: string;
  price?: number;
  features?: string[];
  category?: string;
  rating?: number;
  totalOrders?: number;
  image?: string;
  icon?: ReactNode;
  iconKey?: string;
  isPopular?: boolean;
  isNew?: boolean;
  slug?: string;
}
