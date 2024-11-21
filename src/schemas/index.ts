import { PrismaClient } from "@prisma/client"

// prisma connection 관리: https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections/connection-management

// prisma 단일 인스턴스화: https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/databases-connections#prismaclient-in-long-running-applications
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

/** FOR EXAMPLE */
async function getUsers() {
    const allUsers = await prisma.user.findMany()
    console.dir(allUsers, { depth: null })
}

async function createUser() {
    const create = await prisma.user.create({
        data: {
            name: "YoungWoo",
            email: "asd123@gmail.com",
        },
    })
    console.log("🚀 ~ main ~ create:", create)
}

async function modifyUser() {
    const modify = await prisma.user.update({
        where: { name: "YoungWoo" },
        data: { joinState: false },
    })
    console.log("🚀 ~ modifyUser ~ modify:", modify)
}

async function main() {
    const allUsers = await prisma.user.findMany()
    console.log("🚀 ~ main ~ allUsers:", allUsers)
}

export default prisma
