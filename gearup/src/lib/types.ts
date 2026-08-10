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

export type GearStatus = 'ACTIVE' | 'INACTIVE';

export interface GearItem {
  id: string;
  name: string;
  description: string;
  categoryId?: string;
  category: string;
  pricePerDay: number;
  deposit: number;
  images: string[];
  brand: string;
  specifications: Record<string, string>;
  status: GearStatus;
  quantityTotal: number;
  quantityAvailable?: number;
  location: string;
  rating: number;
  reviewCount: number;
  providerId: string;
  providerName: string;
  providerEmail: string;
  createdAt: string;
}

export type OrderStatus = 'PLACED' | 'CONFIRMED' | 'PAID' | 'PICKED_UP' | 'RETURNED' | 'CANCELLED';
export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED';

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
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
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
  status?: string;
  sortBy?: 'price-asc' | 'price-desc' | 'rating' | 'newest';
}
