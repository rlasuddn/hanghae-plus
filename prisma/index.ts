import { PrismaClient } from "@prisma/client"

// prisma connection 관리: https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections/connection-management

// prisma 단일 인스턴스화: https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections#prismaclient-in-long-running-applications
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

const prisma = globalForPrisma.prisma || new PrismaClient({ log: ["query"] })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export default prisma
