import { v } from "convex/values";
import { mutation } from "../_generated/server";

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