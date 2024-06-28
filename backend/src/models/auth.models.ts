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

export const dbSetResetToken = async (email: string, resetToken: string) => {
    try {
        await prisma.user.update({
            where: {
                email: email,
            },
            data: {
                resetToken: resetToken,
            },
        });
    } catch (error) {
        console.log(error);
        throw new Error("An database error occurred");
    }
}

export const dbSetNewPassword = async (resetToken: string, newPassword: string) => {
    try {
        await prisma.user.update({
            where: {
                resetToken: resetToken,
            },
            data: {
                password: newPassword,
                resetToken: null,
            },
        })
        console.log("updated password")
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const dbFindUserByResetToken = async (resetToken: string) => {
    return await prisma.user.findFirst({
        where: {
            resetToken: resetToken,
        },
    });
};