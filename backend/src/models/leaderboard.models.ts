import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const dbGetTopHappiness = async () => {
    return await prisma.profile.findMany({
        take: 3,
        orderBy: {
            happinessPoints: "desc",
        },
    });
};

export const dbGetAllHappiness = async () => {
    return await prisma.profile.findMany({
        orderBy: { happinessPoints: "desc" },
    });
};

export const dbGetMyHapiness = async (uid: string) => {
    const allProfiles = await prisma.profile.findMany({
        orderBy: { happinessPoints: "desc" },
    });

    // Find the index (rank) of the user's profile
    const userRank =
        allProfiles.findIndex((profile) => profile.uid === uid) + 1;

    return userRank;
};
