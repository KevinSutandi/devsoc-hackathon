import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dbGetAllJournals = async (uid: string) => {
    return await prisma.journal.findMany({ where: { profileUid: uid } });
};

export const dbCreateJournal = async (
    uid: string,
    title: string,
    content: string,
    image: string,
) => {
    return await prisma.journal.create({
        data: { title, profileUid: uid, content, image },
    });
};

export const dbGetJournalById = async (id: number) => {
    return await prisma.journal.findUnique({ where: { id: id } });
};

export const dbUpdateJournal = async (
    id: number,
    title: string,
    content: string,
    image: string,
) => {
    return await prisma.journal.update({
        where: { id: id },
        data: {
            title,
            content,
            image,
            updatedAt: new Date(),
        },
    });
};

export const dbDeleteJournal = async (id: number) => {
    return await prisma.journal.delete({ where: { id: id } });
};