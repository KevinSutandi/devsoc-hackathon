import { Mood, PrismaClient } from "@prisma/client";
import { dbGetUserProfileByUid } from "./users.models";
import { calculateMood } from "../utils/happiness.utils";

const prisma = new PrismaClient();

export const dbUpsertCalendar = async (date: Date, uid: string, mood: Mood) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDay();

    const user = await dbGetUserProfileByUid(uid);

    if (!user) {
        throw new Error("HOLY SHIT");
    }

    const prev = await prisma.calendar.findFirst({
        where: {
            uid,
            year,
            month,
            day,
        },
    });

    // call util fn
    let userPoints = user.happinessPoints;
    let points = 0;
    if (prev) {
        // call util function
        points -= calculateMood(prev.mood);
    }
    points += calculateMood(mood);

    userPoints -= points;

    //updatedb
    await prisma.profile.update({
        where: {
            uid,
        },
        data: {
            happinessPoints: userPoints,
        },
    });

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
