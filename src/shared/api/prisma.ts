import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["error", "warn"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export const defaulTableSelectors = {
  user: { id: true, name: true, email: true, phoneNumber: true, country: true, countryId: true, cityId: true, city: true, role: true },
} as const;

export default prisma;
