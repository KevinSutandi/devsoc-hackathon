import { PrismaClient, Profile } from "@prisma/client";

const prisma = new PrismaClient();

interface JwtUser extends Profile {
    email: string;
}

export const dbFindUserByEmail = async (email: string) => {
    return await prisma.user.findFirst({
        where: {
            email: email,
        },
    });
};

export const dbGetJwtUserById = async (id: string): Promise<JwtUser> => {
    try {
        const result = await prisma.user.findFirst({
            where: {
                id,
            },
            select: {
                id: true,
                email: true,
                profile: true,
            },
        });

        if (!result) {
            throw new Error("User not found");
        }

        if (!result.profile) {
            throw new Error("Profile not found");
        }

        return {
            email: result.email,
            uid: result.profile.uid,
            username: result.profile.username,
            fullname: result.profile.fullname,
            image: result.profile.image,
            createdAt: result.profile.createdAt,
            updatedAt: result.profile.updatedAt,
        };
    } catch (error) {
        throw error;
    }
};

export const dbGetUserByUsername = async (username: string) => {
    return await prisma.profile.findFirst({
        where: {
            username: username,
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
};

export const dbSetNewPassword = async (
    resetToken: string,
    newPassword: string,
) => {
    try {
        await prisma.user.update({
            where: {
                resetToken: resetToken,
            },
            data: {
                password: newPassword,
                resetToken: null,
            },
        });
        console.log("updated password");
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const dbFindUserByResetToken = async (resetToken: string) => {
    return await prisma.user.findFirst({
        where: {
            resetToken: resetToken,
        },
    });
};
