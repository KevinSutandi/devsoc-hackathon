import { Mood, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dbUpsertCalendar = async (date: Date, uid: string, mood: Mood) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDay();

    return await prisma.calendar.upsert({
        where: {
            uniqueDate: {
                uid,
                year,
                month,
                day,
            },
        },
        update: {
            mood,
        },
        create: {
            mood,
            uid,
            year,
            month,
            day,
        },
    });
};

export const dbGetMonthByUid = async (uid: string, date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    return await prisma.calendar.findMany({
        where: {
            uid,
            year,
            month,
        },
    });
};

export const dbGetCalandarByDate = async (uid: string, date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDay();

    return await prisma.calendar.findFirst({
        where: {
            uid,
            year,
            month,
            day,
        },
    });
};
