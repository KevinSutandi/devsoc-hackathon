import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dbCreateUserProfile = async (
    uid: string,
    username: string,
    fullname: string,
) => {
    return await prisma.profile.create({
        data: {
            username,
            fullname,
            uid,
        },
    });
};

export const dbGetUserProfileByUid = async (uid: string) => {
    return await prisma.profile.findFirst({
        where: {
            uid,
        },
    });
};

export const dbUpdateUserProfile = async (
    uid: string,
    fullname: string,
    image: string,
) => {
    return await prisma.profile.update({
        where: {
            uid,
        },
        data: {
            image,
            fullname,
        },
    });
};