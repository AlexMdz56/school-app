import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    students: defineTable({
        matricula: v.string(),
        nombre: v.string(),
        correo: v.string(),
    }),
    teachers: defineTable({
        numEmpleado: v.string(),
        nombre: v.string(),
        correo: v.string(),
    }),
    subjects: defineTable({
        identificador: v.string(),
        materia: v.string(),
    }),
    classrooms: defineTable({
        numero: v.string(),
        edificio: v.string(),
        planta: v.string(),
    }),
    schedules: defineTable({
        periodo: v.string(),
    }),
    grades: defineTable({
        materia: v.string(),
        nota: v.number(),
        alumno: v.id("students"),
    }),
    users: defineTable({
        clerkUserId: v.string(),
        nombre: v.string(),
        correo: v.string(),
        rol: v.string(),
    }),
});