export type UserRole = 'CUSTOMER' | 'PROVIDER' | 'ADMIN';
export type UserStatus = 'ACTIVE' | 'SUSPENDED';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  status: UserStatus;
  createdAt: string;
}

export type GearAvailability = 'AVAILABLE' | 'UNAVAILABLE' | 'MAINTENANCE';

export interface GearItem {
  id: string;
  title: string;
  description: string;
  category: string;
  pricePerDay: number;
  deposit: number;
  images: string[];
  brand: string;
  specifications: Record<string, string>;
  availability: GearAvailability;
  stock: number;
  location: string;
  rating: number;
  reviewCount: number;
  providerId: string;
  providerName: string;
  providerEmail: string;
  createdAt: string;
}

export type OrderStatus = 'PLACED' | 'CONFIRMED' | 'PAID' | 'PICKED_UP' | 'RETURNED' | 'CANCELLED';
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED';

export interface RentalOrder {
  id: string;
  gearId: string;
  gearTitle: string;
  gearImage: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  providerId: string;
  providerName: string;
  startDate: string; // ISO date format YYYY-MM-DD
  endDate: string;   // ISO date format YYYY-MM-DD
  totalDays: number;
  pricePerDay: number;
  totalPrice: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentRecord {
  id: string;
  rentalId: string;
  amount: number;
  currency: string;
  gateway: 'STRIPE' | 'SSLCOMMERZ';
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
  createdAt: string;
}

export interface Review {
  id: string;
  gearId: string;
  rentalId: string;
  customerId: string;
  customerName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface GearFilterParams {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  brand?: string;
  availability?: string;
  sortBy?: 'price-asc' | 'price-desc' | 'rating' | 'newest';
}
