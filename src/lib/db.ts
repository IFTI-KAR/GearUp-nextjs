import { User, GearItem, RentalOrder, PaymentRecord, Review } from './types';

// Pre-seeded Users
export const INITIAL_USERS: User[] = [
  {
    id: 'usr-customer-1',
    name: 'Alex Johnson',
    email: 'customer@gearup.com',
    role: 'CUSTOMER',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    phone: '+1 (555) 234-5678',
    status: 'ACTIVE',
    createdAt: '2026-01-15T10:00:00Z',
  },
  {
    id: 'usr-provider-1',
    name: 'Mountain Peak Rentals',
    email: 'provider@gearup.com',
    role: 'PROVIDER',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    phone: '+1 (555) 876-5432',
    status: 'ACTIVE',
    createdAt: '2026-01-10T09:00:00Z',
  },
  {
    id: 'usr-admin-1',
    name: 'GearUp Moderator',
    email: 'admin@gearup.com',
    role: 'ADMIN',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    phone: '+1 (555) 999-0000',
    status: 'ACTIVE',
    createdAt: '2026-01-01T08:00:00Z',
  },
];

// Pre-seeded Gear Items
export const INITIAL_GEAR: GearItem[] = [
  {
    id: 'gear-1',
    title: 'Trek Fuel EX Trail Mountain Bike 2025',
    description: 'High-performance full-suspension mountain bike perfect for rugged mountain trails and downhill runs. Features hydraulic disc brakes and SRAM 12-speed drivetrain.',
    category: 'Cycling',
    pricePerDay: 45,
    deposit: 150,
    images: [
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=1000&q=80',
    ],
    brand: 'Trek',
    specifications: {
      'Frame Size': 'Medium (17.5")',
      'Wheel Size': '29 inches',
      'Suspension': 'Full Suspension 140mm',
      'Weight': '13.8 kg',
    },
    availability: 'AVAILABLE',
    stock: 3,
    location: 'Boulder, CO',
    rating: 4.9,
    reviewCount: 18,
    providerId: 'usr-provider-1',
    providerName: 'Mountain Peak Rentals',
    providerEmail: 'provider@gearup.com',
    createdAt: '2026-02-01T12:00:00Z',
  },
  {
    id: 'gear-2',
    title: 'MSR Hubba Hubba Ultralight 3-Person Tent',
    description: 'Freestanding, lightweight 3-season camping tent engineered for backpackers who need maximum space without added weight. Includes waterproof rainfly and stakes.',
    category: 'Camping',
    pricePerDay: 25,
    deposit: 80,
    images: [
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1000&q=80',
    ],
    brand: 'MSR',
    specifications: {
      'Capacity': '3 Person',
      'Packed Weight': '1.7 kg',
      'Floor Area': '3.67 sq m',
      'Seasons': '3-Season',
    },
    availability: 'AVAILABLE',
    stock: 5,
    location: 'Denver, CO',
    rating: 4.8,
    reviewCount: 24,
    providerId: 'usr-provider-1',
    providerName: 'Mountain Peak Rentals',
    providerEmail: 'provider@gearup.com',
    createdAt: '2026-02-05T15:30:00Z',
  },
  {
    id: 'gear-3',
    title: 'BOTE HD Aero Inflatable Stand Up Paddle Board',
    description: 'Ultra-stable 11ft6in inflatable SUP kit complete with adjustable carbon paddle, high-pressure pump, leash, and heavy-duty travel bag.',
    category: 'Water Sports',
    pricePerDay: 35,
    deposit: 100,
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=1000&q=80',
    ],
    brand: 'BOTE',
    specifications: {
      'Length': '11ft 6in',
      'Max Weight Capacity': '145 kg',
      'Inflation PSI': '15 PSI',
    },
    availability: 'AVAILABLE',
    stock: 4,
    location: 'Lake Tahoe, CA',
    rating: 4.7,
    reviewCount: 12,
    providerId: 'usr-provider-1',
    providerName: 'Mountain Peak Rentals',
    providerEmail: 'provider@gearup.com',
    createdAt: '2026-02-10T09:15:00Z',
  },
  {
    id: 'gear-4',
    title: 'Burton Custom Flying V Snowboard 2025 + Bindings',
    description: 'All-mountain versatile snowboard set up with Medium Burton Cartel bindings. Ideal for powder, park, and high-speed carving on slopes.',
    category: 'Winter Sports',
    pricePerDay: 40,
    deposit: 120,
    images: [
      'https://images.unsplash.com/photo-1522056615691-da7b8106c665?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1565992441121-4367c2967103?auto=format&fit=crop&w=1000&q=80',
    ],
    brand: 'Burton',
    specifications: {
      'Length': '158 cm',
      'Rocker Profile': 'Flying V Rocker/Camber',
      'Flex': 'Medium Stiff',
    },
    availability: 'AVAILABLE',
    stock: 2,
    location: 'Vail, CO',
    rating: 5.0,
    reviewCount: 31,
    providerId: 'usr-provider-1',
    providerName: 'Mountain Peak Rentals',
    providerEmail: 'provider@gearup.com',
    createdAt: '2026-02-12T14:20:00Z',
  },
  {
    id: 'gear-5',
    title: 'Petzl Complete Rock Climbing Gear Package',
    description: 'Pro-grade harness, Petzl Elios helmet, 60m Sterling dry rope, ATC belay device, and set of 12 quickdraws.',
    category: 'Climbing',
    pricePerDay: 30,
    deposit: 90,
    images: [
      'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1000&q=80',
    ],
    brand: 'Petzl',
    specifications: {
      'Harness Size': 'Adjustable M-L',
      'Rope Length': '60m (9.8mm)',
      'Safety Certification': 'UIAA / CE',
    },
    availability: 'AVAILABLE',
    stock: 3,
    location: 'Moab, UT',
    rating: 4.9,
    reviewCount: 9,
    providerId: 'usr-provider-1',
    providerName: 'Mountain Peak Rentals',
    providerEmail: 'provider@gearup.com',
    createdAt: '2026-02-14T11:00:00Z',
  },
  {
    id: 'gear-6',
    title: 'Concept2 Model D Ergometer Rowing Machine',
    description: 'Commercial quality indoor rowing machine with PM5 performance monitor. Perfect for temporary training setups and home workout events.',
    category: 'Fitness & Gym',
    pricePerDay: 28,
    deposit: 100,
    images: [
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1000&q=80',
    ],
    brand: 'Concept2',
    specifications: {
      'Monitor': 'PM5 Backlit',
      'Resistance': 'Air Damper 1-10',
      'Max User Weight': '227 kg',
    },
    availability: 'AVAILABLE',
    stock: 2,
    location: 'Seattle, WA',
    rating: 4.8,
    reviewCount: 15,
    providerId: 'usr-provider-1',
    providerName: 'Mountain Peak Rentals',
    providerEmail: 'provider@gearup.com',
    createdAt: '2026-02-18T16:00:00Z',
  },
];

// Pre-seeded Orders
export const INITIAL_ORDERS: RentalOrder[] = [
  {
    id: 'ord-101',
    gearId: 'gear-1',
    gearTitle: 'Trek Fuel EX Trail Mountain Bike 2025',
    gearImage: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1000&q=80',
    customerId: 'usr-customer-1',
    customerName: 'Alex Johnson',
    customerEmail: 'customer@gearup.com',
    providerId: 'usr-provider-1',
    providerName: 'Mountain Peak Rentals',
    startDate: '2026-08-05',
    endDate: '2026-08-08',
    totalDays: 3,
    pricePerDay: 45,
    totalPrice: 135,
    status: 'PLACED',
    paymentStatus: 'PENDING',
    createdAt: '2026-07-28T14:00:00Z',
    updatedAt: '2026-07-28T14:00:00Z',
  },
  {
    id: 'ord-102',
    gearId: 'gear-2',
    gearTitle: 'MSR Hubba Hubba Ultralight 3-Person Tent',
    gearImage: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1000&q=80',
    customerId: 'usr-customer-1',
    customerName: 'Alex Johnson',
    customerEmail: 'customer@gearup.com',
    providerId: 'usr-provider-1',
    providerName: 'Mountain Peak Rentals',
    startDate: '2026-08-10',
    endDate: '2026-08-13',
    totalDays: 3,
    pricePerDay: 25,
    totalPrice: 75,
    status: 'CONFIRMED',
    paymentStatus: 'PENDING',
    createdAt: '2026-07-25T11:20:00Z',
    updatedAt: '2026-07-26T09:10:00Z',
  },
  {
    id: 'ord-103',
    gearId: 'gear-3',
    gearTitle: 'BOTE HD Aero Inflatable Stand Up Paddle Board',
    gearImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
    customerId: 'usr-customer-1',
    customerName: 'Alex Johnson',
    customerEmail: 'customer@gearup.com',
    providerId: 'usr-provider-1',
    providerName: 'Mountain Peak Rentals',
    startDate: '2026-07-20',
    endDate: '2026-07-22',
    totalDays: 2,
    pricePerDay: 35,
    totalPrice: 70,
    status: 'RETURNED',
    paymentStatus: 'PAID',
    paymentId: 'pay-789012',
    createdAt: '2026-07-18T10:00:00Z',
    updatedAt: '2026-07-23T16:00:00Z',
  },
];

// Pre-seeded Reviews
export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    gearId: 'gear-1',
    rentalId: 'ord-99',
    customerId: 'usr-customer-1',
    customerName: 'Alex Johnson',
    rating: 5,
    comment: 'The Trek Mountain Bike was in pristine condition! Pick up and return process with Mountain Peak Rentals was smooth as silk.',
    createdAt: '2026-07-15T18:30:00Z',
  },
  {
    id: 'rev-2',
    gearId: 'gear-2',
    rentalId: 'ord-98',
    customerId: 'usr-customer-1',
    customerName: 'Alex Johnson',
    rating: 5,
    comment: 'Tent kept us completely dry during a sudden midnight mountain storm. Light to carry up the trailhead.',
    createdAt: '2026-07-10T12:00:00Z',
  },
];

// In-Memory Database Store (persisted across runtime requests in node process)
class MockDatabase {
  private users: User[] = [...INITIAL_USERS];
  private gear: GearItem[] = [...INITIAL_GEAR];
  private orders: RentalOrder[] = [...INITIAL_ORDERS];
  private reviews: Review[] = [...INITIAL_REVIEWS];

  // Users
  getUsers() { return this.users; }
  getUserById(id: string) { return this.users.find(u => u.id === id); }
  getUserByEmail(email: string) { return this.users.find(u => u.email.toLowerCase() === email.toLowerCase()); }
  createUser(user: User) { this.users.push(user); return user; }
  updateUserStatus(id: string, status: 'ACTIVE' | 'SUSPENDED') {
    const user = this.getUserById(id);
    if (user) user.status = status;
    return user;
  }

  // Gear
  getGear(filter?: { category?: string; search?: string; minPrice?: number; maxPrice?: number; providerId?: string; availability?: string }) {
    let result = [...this.gear];
    if (filter?.category && filter.category !== 'All') {
      result = result.filter(g => g.category.toLowerCase() === filter.category!.toLowerCase());
    }
    if (filter?.providerId) {
      result = result.filter(g => g.providerId === filter.providerId);
    }
    if (filter?.search) {
      const q = filter.search.toLowerCase();
      result = result.filter(g => g.title.toLowerCase().includes(q) || g.description.toLowerCase().includes(q) || g.brand.toLowerCase().includes(q));
    }
    if (filter?.minPrice !== undefined) {
      result = result.filter(g => g.pricePerDay >= filter.minPrice!);
    }
    if (filter?.maxPrice !== undefined) {
      result = result.filter(g => g.pricePerDay <= filter.maxPrice!);
    }
    if (filter?.availability) {
      result = result.filter(g => g.availability === filter.availability);
    }
    return result;
  }

  getGearById(id: string) { return this.gear.find(g => g.id === id); }
  createGear(item: GearItem) { this.gear.unshift(item); return item; }
  updateGear(id: string, patch: Partial<GearItem>) {
    const item = this.getGearById(id);
    if (item) Object.assign(item, patch);
    return item;
  }
  deleteGear(id: string) {
    this.gear = this.gear.filter(g => g.id !== id);
    return true;
  }

  // Orders
  getOrders() { return this.orders; }
  getOrdersByCustomer(customerId: string) { return this.orders.filter(o => o.customerId === customerId); }
  getOrdersByProvider(providerId: string) { return this.orders.filter(o => o.providerId === providerId); }
  getOrderById(id: string) { return this.orders.find(o => o.id === id); }
  createOrder(order: RentalOrder) { this.orders.unshift(order); return order; }
  updateOrderStatus(id: string, status: RentalOrder['status'], paymentStatus?: RentalOrder['paymentStatus'], paymentId?: string) {
    const order = this.getOrderById(id);
    if (order) {
      order.status = status;
      if (paymentStatus) order.paymentStatus = paymentStatus;
      if (paymentId) order.paymentId = paymentId;
      order.updatedAt = new Date().toISOString();
    }
    return order;
  }

  // Reviews
  getReviewsByGear(gearId: string) { return this.reviews.filter(r => r.gearId === gearId); }
  addReview(review: Review) {
    this.reviews.unshift(review);
    // Update gear rating
    const gearReviews = this.getReviewsByGear(review.gearId);
    const avg = gearReviews.reduce((acc, r) => acc + r.rating, 0) / gearReviews.length;
    const gear = this.getGearById(review.gearId);
    if (gear) {
      gear.rating = Number(avg.toFixed(1));
      gear.reviewCount = gearReviews.length;
    }
    return review;
  }
}

// Global Singleton for DB instance
declare global {
  var __gearUpDb: MockDatabase | undefined;
}

export const db = global.__gearUpDb || new MockDatabase();
if (process.env.NODE_ENV !== 'production') {
  global.__gearUpDb = db;
}
