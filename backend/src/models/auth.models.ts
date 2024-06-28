import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dbFindUserByEmail = async (email: string) => {
    return await prisma.user.findFirst({
        where: {
            email: email,
        },
    });
};

export const dbAddUser = async (email: string, password: string) => {
    return await prisma.user.create({
        data: {
            email: email,
            password: password,
        },
    });
};

