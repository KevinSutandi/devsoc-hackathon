import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dbGetAllJournals = async (uid: string) => {
    return await prisma.journal.findMany({ where: { profileUid: uid } });
};
