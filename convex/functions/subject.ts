import { v } from "convex/values";
import { mutation, query } from "../_generated/server";

// Create
export const saveSubject = mutation({
    args: {
        identificador: v.string(),
        materia: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("subjects", {
            ...args,
        })
    },
});

// Read -> todos
export const getSubjects = query({
    handler: async (ctx) => {
        return await ctx.db.query("subjects").collect();
    }
});

// Read -> uno
export const getSubject = query({
    args: { identificador: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("subjects")
            .filter(q => q.eq(q.field('identificador'), args.identificador))
            .first();
    },
});

// Update
export const updateSubject = mutation({
    args: {
        id: v.id("subjects"),
        identificador: v.string(),
        materia: v.string(),
    },
    handler: async (ctx, args) => {
        const { id, ...data } = args;
        await ctx.db.patch(id, data);
    }
});

// Deleted
export const deleteSubject = mutation({
    args: { id: v.id("subjects") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
})