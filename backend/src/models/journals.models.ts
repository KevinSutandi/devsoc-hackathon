import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dbGetAllJournals = async (uid: string, limit?: number) => {
    const queryOptions: any = {
        where: { profileUid: uid },
        orderBy: { createdAt: "desc" },
    };

    if (limit) {
        queryOptions.take = limit;
    }

    return await prisma.journal.findMany(queryOptions);
};

export const dbCreateJournal = async (
    uid: string,
    title: string,
    content: string,
    image: string,
    date: Date,
) => {
    return await prisma.journal.create({
        data: { title, profileUid: uid, content, image, createdAt: date },
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
        },
    });
};

export const dbDeleteJournal = async (id: number) => {
    return await prisma.journal.delete({ where: { id: id } });
};

export const dbGetJournalByDate = async (uid: string, date: Date) => {
    return await prisma.journal.findFirst({
        where: {
            profileUid: uid,
            createdAt: {
                gte: date,
                lt: new Date(date.getTime() + 86400000),
            },
        },
    });
};
