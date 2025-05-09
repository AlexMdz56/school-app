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
        numero: v.number(),
        edificio: v.string(),
        planta: v.string(),
    }),
    schedules: defineTable({
        horario: v.string(),
    }),
});