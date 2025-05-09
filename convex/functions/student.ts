import { v } from "convex/values";
import { mutation, query } from "../_generated/server";

// Create
export const saveStudent = mutation({
    args: {
        matricula: v.string(),
        nombre: v.string(),
        correo: v.string(),
    },
    handler: async (ctx, args) => {
        await ctx.db.insert("students", {
            ...args,
        })
    },
});

// Read -> todos
export const getStudents = query({
    handler: async (ctx) => {
        return await ctx.db.query("students").collect();
    }
});

// Read -> uno
export const getStudent = query({
    args: { matricula: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("students")
            .filter(q => q.eq(q.field('matricula'), args.matricula))
            .first();
    },
});

// Update
export const updateStudent = mutation({
    args: {
        id: v.id("students"),
        matricula: v.string(),
        nombre: v.string(),
        correo: v.string(),
    },
    handler: async (ctx, args) => {
        const { id, ...data } = args;
        await ctx.db.patch(id, data);
    }
});

// Deleted
export const deleteStudent = mutation({
    args: { id: v.id("students") },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id);
    },
})