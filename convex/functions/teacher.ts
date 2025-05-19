import { v } from "convex/values";
import { mutation, query } from "../_generated/server";

// Create
export const saveTeacher = mutation({
    args: {
        numEmpleado: v.string(),
        nombre: v.string(),
        correo: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("teachers", {
            ...args,
        })
    },
});

// Read -> todos
export const getTeachers = query({
    handler: async (ctx) => {
        return await ctx.db.query("teachers").collect();
    }
});

// Read -> uno
export const getTeacher = query({
    args: { numEmpleado: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("teachers")
            .filter(q => q.eq(q.field('numEmpleado'), args.numEmpleado))
            .first();
    },
});

// Update
export const updateTeacher = mutation({
    args: {
        id: v.id("teachers"),
        numEmpleado: v.string(),
        nombre: v.string(),
        correo: v.string(),
    },
    handler: async (ctx, args) => {
        const { id, ...data } = args;
        await ctx.db.patch(id, data);
    }
});

// Deleted
export const deleteTeacher = mutation({
    args: { id: v.id("teachers") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
})