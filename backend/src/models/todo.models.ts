import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const dbGetAllTodos = async (uid: string) => {
    return prisma.todo.findMany({
        where: {
            profileUid: uid,
        },
    });
};

export const dbGetTodoById = async (todoId: number) => {
    return prisma.todo.findFirst({
        where: {
            id: todoId,
        },
    });
};

export const dbCreateTodo = async (profileUid: string, note: string) => {
    return prisma.todo.create({
        data: {
            profileUid,
            check: false,
            note,
        },
    });
};

export const dbUpdateTodo = async (
    uid: string,
    todoId: number,
    note: string,
    check: boolean,
) => {
    return prisma.todo.update({
        where: {
            profileUid: uid,
            id: todoId,
        },
        data: {
            note,
            check,
        },
    });
};

export const dbDeleteTodo = async (uid: string, todoId: number) => {
    prisma.todo.delete({
        where: {
            profileUid: uid,
            id: todoId,
        },
    });
};
