import { GearItem, RentalOrder, Review } from './types';

export const MOCK_GEAR_ITEMS: GearItem[] = [
  {
    id: '1',
    title: 'Trek Marlin 7 Gen 3 Mountain Bike',
    description: 'Race-ready cross-country mountain bike featuring a lightweight Alpha Gold Aluminum frame, RockShox Judy fork with hydraulic lockout, and Shimano Deore 1x10 drivetrain.',
    category: 'Cycling',
    pricePerDay: 45,
    deposit: 150,
    images: [
      'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=1200&q=80'
    ],
    brand: 'Trek',
    specifications: {
      'Frame': 'Alpha Gold Aluminum, tapered head tube',
      'Fork': 'RockShox Judy TK, TurnKey lockout, 100mm travel',
      'Drivetrain': 'Shimano Deore M4100, 10 speed',
      'Brakes': 'Shimano MT200 hydraulic disc'
    },
    availability: 'AVAILABLE',
    stock: 4,
    location: 'Denver, Colorado',
    rating: 4.9,
    reviewCount: 28,
    providerId: 'usr-provider-1',
    providerName: 'Rocky Mountain Outfitters',
    providerEmail: 'provider@gearup.com',
    createdAt: '2026-01-15T10:00:00.000Z'
  },
  {
    id: '2',
    title: 'MSR Hubba Hubba 2-Person Backpacking Tent',
    description: 'Ultra-lightweight 3-season tent with optimized symmetrical geometry and non-tapered floor to maximize room. Easton Syclone poles withstand heavy mountain gusts.',
    category: 'Camping',
    pricePerDay: 25,
    deposit: 80,
    images: [
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1200&q=80'
    ],
    brand: 'MSR',
    specifications: {
      'Capacity': '2 Person',
      'Minimum Weight': '1.30 kg (2 lb 14 oz)',
      'Floor Area': '2.7 sq m (29 sq ft)',
      'Rainfly': '20D ripstop nylon 1200mm Durashield'
    },
    availability: 'AVAILABLE',
    stock: 6,
    location: 'Seattle, Washington',
    rating: 4.8,
    reviewCount: 42,
    providerId: 'usr-provider-1',
    providerName: 'Pacific Northwest Gear',
    providerEmail: 'provider@gearup.com',
    createdAt: '2026-01-18T10:00:00.000Z'
  },
  {
    id: '3',
    title: 'BOTE HD Aero Inflatable Paddle Board (11.5ft)',
    description: 'Versatile inflatable stand-up paddleboard (SUP) engineered with AeroBOTE technology. Includes 3-piece adjustable paddle, removable fin, hand pump, and travel bag.',
    category: 'Water Sports',
    pricePerDay: 35,
    deposit: 100,
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1200&q=80'
    ],
    brand: 'BOTE',
    specifications: {
      'Dimensions': '11ft 6in L × 34in W × 6in D',
      'Max Capacity': '315 lbs',
      'Weight': '30 lbs inflatable',
      'Inclusions': 'Paddle, pump, leash, travel bag'
    },
    availability: 'AVAILABLE',
    stock: 5,
    location: 'Lake Tahoe, California',
    rating: 4.9,
    reviewCount: 19,
    providerId: 'usr-provider-1',
    providerName: 'Tahoe Water Sports',
    providerEmail: 'provider@gearup.com',
    createdAt: '2026-02-01T10:00:00.000Z'
  },
  {
    id: '4',
    title: 'Burton Custom Flying V Snowboard 2026',
    description: 'Iconic all-mountain snowboard featuring Flying V rocker-camber profile for effortless float in powder and precise edge hold on hardpack snow.',
    category: 'Winter Sports',
    pricePerDay: 40,
    deposit: 120,
    images: [
      'https://images.unsplash.com/photo-1565992441121-4367c2967103?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1516100882582-96c3a05fe590?auto=format&fit=crop&w=1200&q=80'
    ],
    brand: 'Burton',
    specifications: {
      'Terrain': 'All-Mountain, Powder',
      'Flex': 'Medium (5/10)',
      'Core': 'Super Fly II 700G Dualzone EGD',
      'Bindings': 'Burton Cartel Re:Flex Included'
    },
    availability: 'AVAILABLE',
    stock: 3,
    location: 'Salt Lake City, Utah',
    rating: 4.7,
    reviewCount: 31,
    providerId: 'usr-provider-1',
    providerName: 'Wasatch Snow Co.',
    providerEmail: 'provider@gearup.com',
    createdAt: '2026-02-05T10:00:00.000Z'
  },
  {
    id: '5',
    title: 'Concept2 Model D Rower with PM5 Monitor',
    description: 'The world standard for indoor rowing. Delivers low-impact, total body aerobic workout with nickel-plated chain and air-resistance flywheel.',
    category: 'Fitness & Gym',
    pricePerDay: 30,
    deposit: 100,
    images: [
      'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80'
    ],
    brand: 'Concept2',
    specifications: {
      'Monitor': 'PM5 Performance Monitor with Bluetooth',
      'Max User Weight': '500 lbs (227 kg)',
      'Storage': 'Separates into 2 parts easily',
      'Chain': 'Nickel-plated steel'
    },
    availability: 'AVAILABLE',
    stock: 2,
    location: 'Austin, Texas',
    rating: 5.0,
    reviewCount: 14,
    providerId: 'usr-provider-1',
    providerName: 'Apex Fitness Gear',
    providerEmail: 'provider@gearup.com',
    createdAt: '2026-02-10T10:00:00.000Z'
  },
  {
    id: '6',
    title: 'Black Diamond Momentum Climbing Harness & Helmet Set',
    description: 'Complete rock climbing package featuring Dual Core Construction harness, Half Dome helmet, ATC belay device, and locking carabiner.',
    category: 'Climbing',
    pricePerDay: 20,
    deposit: 60,
    images: [
      'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1200&q=80'
    ],
    brand: 'Black Diamond',
    specifications: {
      'Harness Size': 'Medium / Large adjustable',
      'Certification': 'CE / UIAA Safety Approved',
      'Gear Loops': '4 Pressure-molded loops',
      'Included': 'Harness, Helmet, Belay, Chalk bag'
    },
    availability: 'AVAILABLE',
    stock: 8,
    location: 'Boulder, Colorado',
    rating: 4.8,
    reviewCount: 22,
    providerId: 'usr-provider-1',
    providerName: 'Front Range Climbing',
    providerEmail: 'provider@gearup.com',
    createdAt: '2026-02-12T10:00:00.000Z'
  },
  {
    id: '7',
    title: 'Specialized Stumpjumper EVO Alloy Bike',
    description: 'Progressive trail mountain bike with adjustable geometry, SWAT door internal storage, and 160mm front / 150mm rear suspension travel.',
    category: 'Cycling',
    pricePerDay: 55,
    deposit: 200,
    images: [
      'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=1200&q=80'
    ],
    brand: 'Specialized',
    specifications: {
      'Travel': '160mm Front / 150mm Rear',
      'Brakes': 'SRAM Code R 4-piston hydraulic',
      'Wheels': 'Roval Traverse 29 Tubeless Ready',
      'Drivetrain': 'SRAM NX Eagle 12-speed'
    },
    availability: 'AVAILABLE',
    stock: 2,
    location: 'Moab, Utah',
    rating: 4.9,
    reviewCount: 36,
    providerId: 'usr-provider-1',
    providerName: 'Moab Adventure Shop',
    providerEmail: 'provider@gearup.com',
    createdAt: '2026-02-15T10:00:00.000Z'
  },
  {
    id: '8',
    title: 'Osprey Atmos AG 65 Backpacking Pack',
    description: 'Award-winning anti-gravity 65L backpacking pack with 3D suspended mesh system that contours seamlessly to your back and hips.',
    category: 'Camping',
    pricePerDay: 18,
    deposit: 50,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80'
    ],
    brand: 'Osprey',
    specifications: {
      'Volume': '65 Liters',
      'Suspension': 'Anti-Gravity 3D Mesh',
      'Fit': 'Adjustable torso & Fit-on-the-Fly belt',
      'Rain Cover': 'Included high-visibility cover'
    },
    availability: 'AVAILABLE',
    stock: 5,
    location: 'Portland, Oregon',
    rating: 4.9,
    reviewCount: 50,
    providerId: 'usr-provider-1',
    providerName: 'Pacific Northwest Gear',
    providerEmail: 'provider@gearup.com',
    createdAt: '2026-02-18T10:00:00.000Z'
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    gearId: '1',
    rentalId: 'ord-1',
    customerId: 'usr-customer-1',
    customerName: 'Alex Johnson',
    rating: 5,
    comment: 'The Trek Marlin 7 was in top condition! Gears shifted smoothly and brakes were super responsive on downhill trails.',
    createdAt: '2026-02-01T14:30:00.000Z'
  },
  {
    id: 'rev-2',
    gearId: '1',
    rentalId: 'ord-2',
    customerId: 'usr-customer-2',
    customerName: 'Sarah Jenkins',
    rating: 5,
    comment: 'Rented this for a weekend ride in Colorado. Pickup was seamless and provider gave great trail recommendations.',
    createdAt: '2026-02-03T11:15:00.000Z'
  },
  {
    id: 'rev-3',
    gearId: '2',
    rentalId: 'ord-3',
    customerId: 'usr-customer-1',
    customerName: 'Alex Johnson',
    rating: 5,
    comment: 'Incredible tent. Lightweight for backpacking and setup took less than 5 minutes in sub-zero wind conditions.',
    createdAt: '2026-02-05T09:20:00.000Z'
  }
];

export const MOCK_ORDERS: RentalOrder[] = [
  {
    id: 'ord-101',
    gearId: '1',
    gearTitle: 'Trek Marlin 7 Gen 3 Mountain Bike',
    gearImage: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=400&q=80',
    customerId: 'usr-customer-1',
    customerName: 'Alex Johnson',
    customerEmail: 'customer@gearup.com',
    providerId: 'usr-provider-1',
    providerName: 'Rocky Mountain Outfitters',
    startDate: '2026-08-10',
    endDate: '2026-08-14',
    totalDays: 4,
    pricePerDay: 45,
    totalPrice: 180,
    status: 'PAID',
    paymentStatus: 'PAID',
    paymentId: 'pay_stripe_9921',
    createdAt: '2026-08-08T10:00:00.000Z',
    updatedAt: '2026-08-08T10:05:00.000Z'
  },
  {
    id: 'ord-102',
    gearId: '2',
    gearTitle: 'MSR Hubba Hubba 2-Person Backpacking Tent',
    gearImage: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=400&q=80',
    customerId: 'usr-customer-1',
    customerName: 'Alex Johnson',
    customerEmail: 'customer@gearup.com',
    providerId: 'usr-provider-1',
    providerName: 'Pacific Northwest Gear',
    startDate: '2026-08-15',
    endDate: '2026-08-18',
    totalDays: 3,
    pricePerDay: 25,
    totalPrice: 75,
    status: 'CONFIRMED',
    paymentStatus: 'PAID',
    paymentId: 'pay_stripe_8812',
    createdAt: '2026-08-07T12:00:00.000Z',
    updatedAt: '2026-08-07T12:10:00.000Z'
  },
  {
    id: 'ord-103',
    gearId: '3',
    gearTitle: 'BOTE HD Aero Inflatable Paddle Board (11.5ft)',
    gearImage: 'https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=400&q=80',
    customerId: 'usr-customer-2',
    customerName: 'Elena Rostova',
    customerEmail: 'elena@example.com',
    providerId: 'usr-provider-1',
    providerName: 'Tahoe Water Sports',
    startDate: '2026-08-20',
    endDate: '2026-08-22',
    totalDays: 2,
    pricePerDay: 35,
    totalPrice: 70,
    status: 'PICKED_UP',
    paymentStatus: 'PAID',
    paymentId: 'pay_ssl_3301',
    createdAt: '2026-08-06T15:30:00.000Z',
    updatedAt: '2026-08-06T15:35:00.000Z'
  }
];
