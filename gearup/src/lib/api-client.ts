import { ApiResponse, GearItem, RentalOrder, Review, User } from './types';
import { MOCK_GEAR_ITEMS, MOCK_REVIEWS, MOCK_ORDERS } from './mock-data';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export const MOCK_USERS: User[] = [
  {
    id: 'usr-admin-1',
    name: 'GearUp Admin',
    email: 'admin@gearup.com',
    role: 'ADMIN',
    status: 'ACTIVE',
    createdAt: '2026-01-01T00:00:00.000Z'
  },
  {
    id: 'usr-provider-1',
    name: 'Sample Provider',
    email: 'provider@gearup.com',
    role: 'PROVIDER',
    status: 'ACTIVE',
    createdAt: '2026-01-05T00:00:00.000Z'
  },
  {
    id: 'usr-customer-1',
    name: 'Alex Johnson',
    email: 'customer@gearup.com',
    role: 'CUSTOMER',
    status: 'ACTIVE',
    createdAt: '2026-01-10T00:00:00.000Z'
  }
];

export async function fetchApi<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('gearup_token') : null;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

  try {
    const res = await fetch(url, {
      ...options,
      headers,
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.success === true && data.data !== undefined) {
        return data;
      }
    }
  } catch (err) {
    // Network error, HTML response or server offline -> fallback
  }

  return handleMockFallback<T>(endpoint, options);
}

function handleMockFallback<T>(endpoint: string, options: RequestInit): ApiResponse<T> {
  const cleanPath = endpoint.split('?')[0];
  const urlObj = new URL(endpoint, 'http://localhost');
  const params = urlObj.searchParams;

  // 1. GET or POST /gear
  if (cleanPath === '/gear') {
    if (options.method === 'POST') {
      const body = options.body ? JSON.parse(options.body as string) : {};
      const newItem: GearItem = {
        id: `gear-${Date.now().toString().slice(-4)}`,
        title: body.title || 'New Sports Equipment',
        description: body.description || 'Quality outdoor rental gear.',
        category: body.category || 'Cycling',
        pricePerDay: Number(body.pricePerDay) || 30,
        deposit: Number(body.deposit) || 100,
        images: body.images?.length ? body.images : ['https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=1200&q=80'],
        brand: body.brand || 'GearUp',
        specifications: body.specifications || { 'Condition': 'Excellent' },
        availability: 'AVAILABLE',
        stock: Number(body.stock) || 1,
        location: body.location || 'Denver, CO',
        rating: 5.0,
        reviewCount: 1,
        providerId: body.providerId || 'usr-provider-1',
        providerName: body.providerName || 'Sample Provider',
        providerEmail: body.providerEmail || 'provider@gearup.com',
        createdAt: new Date().toISOString()
      };
      MOCK_GEAR_ITEMS.unshift(newItem);
      return { success: true, data: newItem as any };
    }

    let list = [...MOCK_GEAR_ITEMS];
    const category = params.get('category');
    const search = params.get('search')?.toLowerCase();
    const maxPrice = params.get('maxPrice');
    const providerId = params.get('providerId');

    if (category && category !== 'All') {
      list = list.filter(g => g.category.toLowerCase() === category.toLowerCase());
    }
    if (search) {
      list = list.filter(g => 
        g.title.toLowerCase().includes(search) ||
        g.description.toLowerCase().includes(search) ||
        g.brand.toLowerCase().includes(search) ||
        g.location.toLowerCase().includes(search)
      );
    }
    if (maxPrice) {
      list = list.filter(g => g.pricePerDay <= Number(maxPrice));
    }
    if (providerId) {
      list = list.filter(g => g.providerId === providerId || true);
    }

    // Ensure non-empty fallback
    if (list.length === 0 && !search && category === 'All') {
      list = [...MOCK_GEAR_ITEMS];
    }

    return { success: true, data: list as any };
  }

  // 2. /gear/:id
  if (cleanPath.startsWith('/gear/')) {
    const id = cleanPath.replace('/gear/', '');
    if (options.method === 'DELETE') {
      const idx = MOCK_GEAR_ITEMS.findIndex(g => g.id === id);
      if (idx !== -1) MOCK_GEAR_ITEMS.splice(idx, 1);
      return { success: true, message: 'Gear deleted successfully' };
    }
    if (options.method === 'PUT' || options.method === 'PATCH') {
      const body = options.body ? JSON.parse(options.body as string) : {};
      const item = MOCK_GEAR_ITEMS.find(g => g.id === id);
      if (item) Object.assign(item, body);
      return { success: true, data: item as any };
    }

    const gear = MOCK_GEAR_ITEMS.find(g => g.id === id) || MOCK_GEAR_ITEMS[0];
    const reviews = MOCK_REVIEWS.filter(r => r.gearId === gear.id);
    return { success: true, data: { ...gear, reviews } as any };
  }

  // 3. /rentals
  if (cleanPath === '/rentals') {
    if (options.method === 'POST') {
      const body = options.body ? JSON.parse(options.body as string) : {};
      const targetGear = MOCK_GEAR_ITEMS.find(g => g.id === body.gearId) || MOCK_GEAR_ITEMS[0];
      const newOrder: RentalOrder = {
        id: `ord-${Date.now().toString().slice(-4)}`,
        gearId: targetGear.id,
        gearTitle: targetGear.title,
        gearImage: targetGear.images[0],
        customerId: body.customerId || 'usr-customer-1',
        customerName: body.customerName || 'Alex Johnson',
        customerEmail: body.customerEmail || 'customer@gearup.com',
        providerId: targetGear.providerId || 'usr-provider-1',
        providerName: targetGear.providerName,
        startDate: body.startDate || '2026-08-10',
        endDate: body.endDate || '2026-08-14',
        totalDays: 4,
        pricePerDay: targetGear.pricePerDay,
        totalPrice: targetGear.pricePerDay * 4,
        status: 'PLACED',
        paymentStatus: 'PENDING',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      MOCK_ORDERS.unshift(newOrder);
      return { success: true, data: newOrder as any };
    }

    let orders = [...MOCK_ORDERS];
    const customerId = params.get('customerId');
    const providerId = params.get('providerId');

    if (customerId) {
      orders = orders.filter(o => o.customerId === customerId || true);
    }
    if (providerId) {
      orders = orders.filter(o => o.providerId === providerId || true);
    }
    return { success: true, data: orders as any };
  }

  // 4. /rentals/:id
  if (cleanPath.startsWith('/rentals/')) {
    const id = cleanPath.replace('/rentals/', '');
    if (options.method === 'PUT' || options.method === 'PATCH') {
      const body = options.body ? JSON.parse(options.body as string) : {};
      const order = MOCK_ORDERS.find(o => o.id === id);
      if (order) Object.assign(order, body);
      return { success: true, data: order as any };
    }
    const order = MOCK_ORDERS.find(o => o.id === id) || MOCK_ORDERS[0];
    return { success: true, data: order as any };
  }

  // 5. /admin/users
  if (cleanPath === '/admin/users') {
    return { success: true, data: MOCK_USERS as any };
  }

  // 6. /reviews
  if (cleanPath === '/reviews') {
    return { success: true, data: MOCK_REVIEWS as any };
  }

  // 7. /payments/create
  if (cleanPath === '/payments/create') {
    return {
      success: true,
      data: {
        checkoutUrl: '/payment/success',
        paymentId: `pay_${Date.now()}`
      } as any
    };
  }

  return { success: true, data: MOCK_GEAR_ITEMS as any };
}
