import dotenv from "dotenv";
dotenv.config();

const required = (key: string, fallback?: string): string => {
  const value = process.env[key] ?? fallback;
  if (value === undefined) {
    // Don't throw at import time in dev tooling contexts (e.g. `prisma generate`);
    // routes that actually need the value will fail loudly if it's missing.
    console.warn(`[env] Warning: ${key} is not set`);
    return "";
  }
  return value;
};

export const env = {
  NODE_ENV: required("NODE_ENV", "development"),
  PORT: parseInt(required("PORT", "5000"), 10),
  CLIENT_URL: required("CLIENT_URL", "http://localhost:3000"),

  DATABASE_URL: required("DATABASE_URL"),

  JWT_ACCESS_SECRET: required("JWT_ACCESS_SECRET"),
  JWT_ACCESS_EXPIRES_IN: required("JWT_ACCESS_EXPIRES_IN", "1d"),
  JWT_REFRESH_SECRET: required("JWT_REFRESH_SECRET"),
  JWT_REFRESH_EXPIRES_IN: required("JWT_REFRESH_EXPIRES_IN", "30d"),

  BCRYPT_SALT_ROUNDS: parseInt(required("BCRYPT_SALT_ROUNDS", "10"), 10),

  STRIPE_SECRET_KEY: required("STRIPE_SECRET_KEY"),
  STRIPE_WEBHOOK_SECRET: required("STRIPE_WEBHOOK_SECRET"),
  STRIPE_SUCCESS_URL: required("STRIPE_SUCCESS_URL", "http://localhost:3000/payment/success"),
  STRIPE_CANCEL_URL: required("STRIPE_CANCEL_URL", "http://localhost:3000/payment/cancel"),

  ADMIN_NAME: required("ADMIN_NAME", "GearUp Admin"),
  ADMIN_EMAIL: required("ADMIN_EMAIL", "admin@gearup.com"),
  ADMIN_PASSWORD: required("ADMIN_PASSWORD", "Admin@123"),
};
