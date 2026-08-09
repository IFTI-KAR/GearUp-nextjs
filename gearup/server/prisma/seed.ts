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
  const adminEmail = process.env.ADMIN_EMAIL || "admin@gearup.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "Admin@123";
  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10", 10);

  const hashedPassword = await bcrypt.hash(adminPassword, saltRounds);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: process.env.ADMIN_NAME || "GearUp Admin",
      email: adminEmail,
      password: hashedPassword,
      role: "ADMIN",
      status: "ACTIVE",
    },
  });
  console.log(`✅ Admin ready: ${admin.email}`);

  const categoryNames = ["Cycling", "Camping", "Fitness", "Water Sports", "Winter Sports", "Hiking"];
  const categories = [];
  for (const name of categoryNames) {
    const category = await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name, slug: slugify(name), description: `${name} gear and equipment` },
    });
    categories.push(category);
  }
  console.log(`✅ Seeded ${categories.length} categories`);

  const providerPassword = await bcrypt.hash("Provider@123", saltRounds);
  const provider = await prisma.user.upsert({
    where: { email: "provider@gearup.com" },
    update: {},
    create: {
      name: "Sample Provider",
      email: "provider@gearup.com",
      password: providerPassword,
      role: "PROVIDER",
      status: "ACTIVE",
      phone: "+1000000000",
    },
  });
  console.log(`✅ Sample provider ready: ${provider.email} (password: Provider@123)`);

  const customerPassword = await bcrypt.hash("Customer@123", saltRounds);
  const customer = await prisma.user.upsert({
    where: { email: "customer@gearup.com" },
    update: {},
    create: {
      name: "Sample Customer",
      email: "customer@gearup.com",
      password: customerPassword,
      role: "CUSTOMER",
      status: "ACTIVE",
      phone: "+1000000001",
    },
  });
  console.log(`✅ Sample customer ready: ${customer.email} (password: Customer@123)`);

  const cycling = categories.find((c) => c.name === "Cycling")!;
  const camping = categories.find((c) => c.name === "Camping")!;

  const gearCount = await prisma.gearItem.count();
  if (gearCount === 0) {
    await prisma.gearItem.createMany({
      data: [
        {
          providerId: provider.id,
          categoryId: cycling.id,
          name: "Mountain Bike - Trek Marlin 7",
          description: "Durable mountain bike, great for trails and rough terrain.",
          brand: "Trek",
          pricePerDay: 15.0,
          quantityTotal: 5,
          quantityAvailable: 5,
          images: ["https://images.example.com/gear/trek-marlin-7.jpg"],
          location: "Dhaka, Bangladesh",
        },
        {
          providerId: provider.id,
          categoryId: camping.id,
          name: "4-Person Camping Tent",
          description: "Waterproof tent, easy setup, fits up to 4 people.",
          brand: "Coleman",
          pricePerDay: 8.5,
          quantityTotal: 10,
          quantityAvailable: 10,
          images: ["https://images.example.com/gear/coleman-tent.jpg"],
          location: "Dhaka, Bangladesh",
        },
      ],
    });
    console.log("✅ Seeded sample gear items");
  }

  console.log("🌱 Seed complete!");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
