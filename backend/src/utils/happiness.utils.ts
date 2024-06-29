import { Mood } from "@prisma/client";

export const calculateMood = (mood: Mood): number => {
    if (mood == "LAUGHING") {
        return 100;
    } else if (mood == "HAPPY") {
        return 50;
    } else if (mood == "NEUTRAL" || mood == undefined) {
        return 0;
    } else if (mood == "WORRIED") {
        return -50;
    } else if (mood == "SAD" || mood == "ANGRY") {
        return -70;
    } else {
        return -100;
    }ƒ
};
