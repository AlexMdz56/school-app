import { v } from "convex/values";
import { mutation, query } from "../_generated/server";

export const saveUser = mutation({
  args: {
    clerkUserId: v.string(),
    nombre: v.string(),
    correo: v.string(),
    rol: v.string(),
  },
  handler: async (ctx, args) => {
    // Verificar si el usuario ya existe
    const existingUser = await ctx.db
      .query("users")
      .filter(q => q.eq("clerkUserId", args.clerkUserId))
      .unique();

    if (existingUser) {
      throw new Error("User already exists in database");
    }

    const userId = await ctx.db.insert("users", {
      clerkUserId: args.clerkUserId,
      nombre: args.nombre,
      correo: args.correo,
      rol: args.rol,
    });

    return { userId };
  },
});

export const getAllUsers = query({
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();

    return users.map((user) => ({
      id: user._id,
      clerkUserId: user.clerkUserId,
      nombre: user.nombre,
      correo: user.correo,
      rol: user.rol,
    }));
  },
});

export const getUserByClerkId = query({
  args: { clerkUserId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .filter(q => q.eq(q.field('clerkUserId'), args.clerkUserId))
      .first();
  }
});

export const updateUser = mutation({
  args: {
    id: v.id("users"),
    nombre: v.string(),
    correo: v.string(),
    rol: v.string(),
  },
  handler: async (ctx, args) => {
    const { id, ...data } = args;
    await ctx.db.patch(id, data);
  },
});

export const deleteUser = mutation({
  args: { id: v.id("users") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
