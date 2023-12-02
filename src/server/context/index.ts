import { PrismaClient } from '@prisma/client';

export interface Context {
  connectDB(): Promise<void>;
  prisma: PrismaClient;
}

const prisma = new PrismaClient();

export const context: Context = {
  prisma,
  connectDB() {
    return prisma.$connect();
  },
};
