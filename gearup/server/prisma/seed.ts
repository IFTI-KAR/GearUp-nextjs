import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

const slugify = (name: string) =>
  name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

async function main() {
  console.log("🌱 Starting database seed...");

  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10);
  const commonPassword = await bcrypt.hash("Password123!", saltRounds);

  // 1. Create Users
  const admin = await prisma.user.upsert({
    where: { email: "admin@gearup.com" },
    update: { password: commonPassword },
    create: {
      name: "GearUp Admin",
      email: "admin@gearup.com",
      password: commonPassword,
      role: "ADMIN",
      status: "ACTIVE",
      phone: "+1 (800) 555-ADMIN",
      address: "100 Alpine Way, Boulder, CO",
    },
  });
  console.log(`✅ Admin user ready: ${admin.email}`);

  const provider = await prisma.user.upsert({
    where: { email: "provider@gearup.com" },
    update: { password: commonPassword },
    create: {
      name: "Mountain Peak Gear Shop",
      email: "provider@gearup.com",
      password: commonPassword,
      role: "PROVIDER",
      status: "ACTIVE",
      phone: "+1 (555) 987-6543",
      address: "450 Trailhead Rd, Denver, CO",
    },
  });
  console.log(`✅ Provider user ready: ${provider.email}`);

  const customer = await prisma.user.upsert({
    where: { email: "customer@gearup.com" },
    update: { password: commonPassword },
    create: {
      name: "Alex Johnson",
      email: "customer@gearup.com",
      password: commonPassword,
      role: "CUSTOMER",
      status: "ACTIVE",
      phone: "+1 (555) 234-5678",
      address: "742 Evergreen Terrace, Seattle, WA",
    },
  });
  console.log(`✅ Customer user ready: ${customer.email}`);

  // 2. Create Categories
  const categoryData = [
    { name: "Cycling", description: "Mountain bikes, road bikes, and cycling helmets" },
    { name: "Camping", description: "Tents, sleeping bags, stoves, and backpacks" },
    { name: "Water Sports", description: "Paddleboards, kayaks, and life jackets" },
    { name: "Winter Sports", description: "Snowboards, skis, and winter gear" },
    { name: "Fitness & Gym", description: "Indoor rowers, weights, and cardio equipment" },
    { name: "Climbing", description: "Harnesses, helmets, ropes, and belay devices" },
  ];

  const categoryMap: Record<string, string> = {};
  for (const cat of categoryData) {
    const category = await prisma.category.upsert({
      where: { name: cat.name },
      update: { description: cat.description },
      create: {
        name: cat.name,
        slug: slugify(cat.name),
        description: cat.description,
      },
    });
    categoryMap[cat.name] = category.id;
  }
  console.log(`✅ ${Object.keys(categoryMap).length} Categories seeded`);

  // 3. Seed Gear Items (Matching Frontend MOCK_GEAR_ITEMS)
  const gearItemsData = [
    {
      id: "1",
      name: "Trek Marlin 7 Gen 3 Mountain Bike",
      description: "Race-ready cross-country mountain bike featuring a lightweight Alpha Gold Aluminum frame, RockShox Judy fork with hydraulic lockout, and Shimano Deore 1x10 drivetrain.",
      categoryName: "Cycling",
      pricePerDay: 45.00,
      brand: "Trek",
      images: [
        "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=1200&q=80"
      ],
      specifications: {
        "Frame": "Alpha Gold Aluminum, tapered head tube",
        "Fork": "RockShox Judy TK, TurnKey lockout, 100mm travel",
        "Drivetrain": "Shimano Deore M4100, 10 speed",
        "Brakes": "Shimano MT200 hydraulic disc"
      },
      quantityTotal: 4,
      quantityAvailable: 4,
      location: "Denver, Colorado",
    },
    {
      id: "2",
      name: "MSR Hubba Hubba 2-Person Backpacking Tent",
      description: "Ultra-lightweight 3-season tent with optimized symmetrical geometry and non-tapered floor to maximize room. Easton Syclone poles withstand heavy mountain gusts.",
      categoryName: "Camping",
      pricePerDay: 25.00,
      brand: "MSR",
      images: [
        "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=1200&q=80"
      ],
      specifications: {
        "Capacity": "2 Person",
        "Minimum Weight": "1.30 kg (2 lb 14 oz)",
        "Floor Area": "2.7 sq m (29 sq ft)",
        "Rainfly": "20D ripstop nylon 1200mm Durashield"
      },
      quantityTotal: 6,
      quantityAvailable: 6,
      location: "Seattle, Washington",
    },
    {
      id: "3",
      name: "BOTE HD Aero Inflatable Paddle Board (11.5ft)",
      description: "Versatile inflatable stand-up paddleboard (SUP) engineered with AeroBOTE technology. Includes 3-piece adjustable paddle, removable fin, hand pump, and travel bag.",
      categoryName: "Water Sports",
      pricePerDay: 35.00,
      brand: "BOTE",
      images: [
        "https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80"
      ],
      specifications: {
        "Dimensions": "11ft 6in L × 34in W × 6in D",
        "Max Capacity": "315 lbs",
        "Weight": "30 lbs inflatable",
        "Inclusions": "Paddle, pump, leash, travel bag"
      },
      quantityTotal: 5,
      quantityAvailable: 5,
      location: "Lake Tahoe, California",
    },
    {
      id: "4",
      name: "Burton Custom Flying V Snowboard 2026",
      description: "Iconic all-mountain snowboard featuring Flying V rocker-camber profile for effortless float in powder and precise edge hold on hardpack snow.",
      categoryName: "Winter Sports",
      pricePerDay: 40.00,
      brand: "Burton",
      images: [
        "https://images.unsplash.com/photo-1522056615691-da7b81069da2?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1565992441121-4367c2967103?auto=format&fit=crop&w=1200&q=80"
      ],
      specifications: {
        "Terrain": "All-Mountain, Powder",
        "Flex": "Medium (5/10)",
        "Core": "Super Fly II 700G Dualzone EGD",
        "Bindings": "Burton Cartel Re:Flex Included"
      },
      quantityTotal: 3,
      quantityAvailable: 3,
      location: "Salt Lake City, Utah",
    },
    {
      id: "5",
      name: "Concept2 Model D Rower with PM5 Monitor",
      description: "The world standard for indoor rowing. Delivers low-impact, total body aerobic workout with nickel-plated chain and air-resistance flywheel.",
      categoryName: "Fitness & Gym",
      pricePerDay: 30.00,
      brand: "Concept2",
      images: [
        "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80"
      ],
      specifications: {
        "Monitor": "PM5 Performance Monitor with Bluetooth",
        "Max User Weight": "500 lbs (227 kg)",
        "Storage": "Separates into 2 parts easily",
        "Chain": "Nickel-plated steel"
      },
      quantityTotal: 2,
      quantityAvailable: 2,
      location: "Austin, Texas",
    },
    {
      id: "6",
      name: "Black Diamond Momentum Climbing Harness & Helmet Set",
      description: "Complete rock climbing package featuring Dual Core Construction harness, Half Dome helmet, ATC belay device, and locking carabiner.",
      categoryName: "Climbing",
      pricePerDay: 20.00,
      brand: "Black Diamond",
      images: [
        "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1200&q=80"
      ],
      specifications: {
        "Harness Size": "Medium / Large adjustable",
        "Certification": "CE / UIAA Safety Approved",
        "Gear Loops": "4 Pressure-molded loops",
        "Included": "Harness, Helmet, Belay, Chalk bag"
      },
      quantityTotal: 8,
      quantityAvailable: 8,
      location: "Boulder, Colorado",
    },
    {
      id: "7",
      name: "Specialized Stumpjumper EVO Alloy Bike",
      description: "Progressive trail mountain bike with adjustable geometry, SWAT door internal storage, and 160mm front / 150mm rear suspension travel.",
      categoryName: "Cycling",
      pricePerDay: 55.00,
      brand: "Specialized",
      images: [
        "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?auto=format&fit=crop&w=1200&q=80"
      ],
      specifications: {
        "Travel": "160mm Front / 150mm Rear",
        "Brakes": "SRAM Code R 4-piston hydraulic",
        "Wheels": "Roval Traverse 29 Tubeless Ready",
        "Drivetrain": "SRAM NX Eagle 12-speed"
      },
      quantityTotal: 2,
      quantityAvailable: 2,
      location: "Moab, Utah",
    },
    {
      id: "8",
      name: "Osprey Atmos AG 65 Backpacking Pack",
      description: "Award-winning anti-gravity 65L backpacking pack with 3D suspended mesh system that contours seamlessly to your back and hips.",
      categoryName: "Camping",
      pricePerDay: 18.00,
      brand: "Osprey",
      images: [
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80"
      ],
      specifications: {
        "Volume": "65 Liters",
        "Suspension": "Anti-Gravity 3D Mesh",
        "Fit": "Adjustable torso & Fit-on-the-Fly belt",
        "Rain Cover": "Included high-visibility cover"
      },
      quantityTotal: 5,
      quantityAvailable: 5,
      location: "Portland, Oregon",
    }
  ];

  const gearMap: Record<string, string> = {};

  for (const item of gearItemsData) {
    const categoryId = categoryMap[item.categoryName];
    if (!categoryId) continue;

    const gear = await prisma.gearItem.upsert({
      where: { id: item.id },
      update: {
        name: item.name,
        description: item.description,
        brand: item.brand,
        pricePerDay: item.pricePerDay,
        images: item.images,
        specifications: item.specifications,
        quantityTotal: item.quantityTotal,
        quantityAvailable: item.quantityAvailable,
        location: item.location,
        status: "ACTIVE",
      },
      create: {
        id: item.id,
        providerId: provider.id,
        categoryId: categoryId,
        name: item.name,
        description: item.description,
        brand: item.brand,
        pricePerDay: item.pricePerDay,
        images: item.images,
        specifications: item.specifications,
        quantityTotal: item.quantityTotal,
        quantityAvailable: item.quantityAvailable,
        location: item.location,
        status: "ACTIVE",
      },
    });
    gearMap[item.id] = gear.id;
  }
  console.log(`✅ ${Object.keys(gearMap).length} Gear items seeded`);

  // 4. Seed Reviews
  const reviewsData = [
    {
      id: "rev-1",
      gearItemId: "1",
      customerId: customer.id,
      rating: 5,
      comment: "The Trek Marlin 7 was in top condition! Gears shifted smoothly and brakes were super responsive on downhill trails.",
    },
    {
      id: "rev-2",
      gearItemId: "1",
      customerId: customer.id,
      rating: 5,
      comment: "Rented this for a weekend ride in Colorado. Pickup was seamless and provider gave great trail recommendations.",
    },
    {
      id: "rev-3",
      gearItemId: "2",
      customerId: customer.id,
      rating: 5,
      comment: "Incredible tent. Lightweight for backpacking and setup took less than 5 minutes in sub-zero wind conditions.",
    },
  ];

  for (const rev of reviewsData) {
    await prisma.review.upsert({
      where: { id: rev.id },
      update: { rating: rev.rating, comment: rev.comment },
      create: {
        id: rev.id,
        gearItemId: rev.gearItemId,
        customerId: rev.customerId,
        rating: rev.rating,
        comment: rev.comment,
      },
    });
  }
  console.log(`✅ ${reviewsData.length} Reviews seeded`);

  console.log("🌱 Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
