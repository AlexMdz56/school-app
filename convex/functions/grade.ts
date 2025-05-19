import { mutation, query } from "../_generated/server";
import { v } from "convex/values";

// Create
export const createGrade = mutation({
  args: {
    materia: v.string(),
    nota: v.number(),
    alumno: v.id("students"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("grades", args);
  }
});

// Read varios
export const getGrades = query(async ({ db }) => {
  return await db.query("grades").collect();
});

// Read uno
export const getGradesByStudent = query({
  args: { alumno: v.id("students") },
  handler: async ({ db }, { alumno }) => {
    return await db.query("grades")
      .filter(q => q.eq(q.field("alumno"), alumno))
      .collect();
  }
});

// Update
export const updateGrade = mutation({
  args: {
    id: v.id("grades"),
    data: v.object({
      materia: v.string(),
      nota: v.number(),
      alumno: v.id("students"),
    }),
  },
  handler: async (ctx, { id, data }) => {
    await ctx.db.patch(id, data);
  }
});

// Delete
export const deleteGrade = mutation({
  args: { id: v.id("grades") },
  handler: async ({ db }, { id }) => {
    await db.delete(id);
  }
});
