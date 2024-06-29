import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dbGetAllJournals = async (uid: string) => {
    return await prisma.journal.findMany({ where: { profileUid: uid } });
};

export const dbCreateJournal = async (
    uid: string,
    title: string,
    content: string,
) => {
    return await prisma.journal.create({
        data: { title, profileUid: uid, content },
    });
};
