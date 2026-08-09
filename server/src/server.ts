import app from "./app";
import { env } from "./config/env";
import prisma from "./config/prisma";

const server = app.listen(env.PORT, () => {
  console.log(`🚀 GearUp API server listening on port ${env.PORT} [${env.NODE_ENV}]`);
});

const gracefulShutdown = async (signal: string) => {
  console.log(`\n${signal} received. Shutting down gracefully...`);
  server.close(async () => {
    await prisma.$disconnect();
    console.log("Server closed. Database disconnected.");
    process.exit(0);
  });
};

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
  server.close(() => process.exit(1));
});
