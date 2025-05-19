import { v } from "convex/values";
import { mutation, query } from "../_generated/server";

// Create
export const saveClassroom = mutation({
    args: {
        numero: v.string(),
        edificio: v.string(),
        planta: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("classrooms", {
            ...args,
        })
    },
});

// Read -> todos
export const getClassrooms = query({
    handler: async (ctx) => {
        return await ctx.db.query("classrooms").collect();
    }
});

// Read -> uno
export const getClassroom = query({
    args: { id: v.id("classrooms") },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("classrooms")
            .filter(q => q.eq(q.field('_id'), args.id))
            .first();
    },
});

// Update
export const updateClassroom = mutation({
    args: {
        id: v.id("classrooms"),
        numero: v.string(),
        edificio: v.string(),
        planta: v.string(),
    },
    handler: async (ctx, args) => {
        const { id, ...data } = args;
        await ctx.db.patch(id, data);
    }
});

// Deleted
export const deleteClassroom = mutation({
    args: { id: v.id("classrooms") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
})