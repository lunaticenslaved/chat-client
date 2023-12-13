import { PrismaClient } from '@prisma/client';

export interface IService {}

export function createServices(_: PrismaClient): IService {
  return {};
}
