import { v } from "convex/values";
import { mutation, query } from "../_generated/server";

// Create
export const saveSchedule = mutation({
    args: {
        periodo: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("schedules", {
            ...args,
        })
    },
});

// Read -> todos
export const getSchedules = query({
    handler: async (ctx) => {
        return await ctx.db.query("schedules").collect();
    }
});

// Read -> uno
export const getSchedule = query({
    args: { id: v.id("schedules"), },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("schedules")
            .filter(q => q.eq(q.field('_id'), args.id))
            .first();
    },
});

// Update
export const updateSchedule = mutation({
    args: {
        id: v.id("schedules"),
        periodo: v.string(),
    },
    handler: async (ctx, args) => {
        const { id, ...data } = args;
        await ctx.db.patch(id, data);
    }
});

// Deleted
export const deleteSchedule = mutation({
    args: { id: v.id("schedules") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
})