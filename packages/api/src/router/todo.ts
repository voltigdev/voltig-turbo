import { createTRPCRouter, publicProcedure } from "@/trpc";
import { db } from "@repo/db/client";
import { todo } from "@repo/db/schema";
import z from "zod";

export const todoRouter = createTRPCRouter({
  getTodos: publicProcedure.query(() => {
    return db.query.todo.findMany();
  }),

  createTodo: publicProcedure.input(z.object({
    title: z.string(),
    description: z.string(),
  })).mutation(({ input }) => {
    return db.insert(todo).values(input);
  }),
});