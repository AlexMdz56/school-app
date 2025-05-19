"use server";

import { NextRequest, NextResponse } from "next/server";
import { api } from "@/convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";
import { Id } from "@/convex/_generated/dataModel";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function GET(req: NextRequest) {
  const alumnoId = req.nextUrl.searchParams.get("alumno");

  try {
    const grades = alumnoId
      ? await convex.query(api.functions.grade.getGradesByStudent, { alumno: alumnoId as Id<"students"> })
      : await convex.query(api.functions.grade.getGrades, {});

    return NextResponse.json(grades);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const id = await convex.mutation(api.functions.grade.createGrade, {
      materia: body.materia,
      nota: body.nota,
      alumno: body.alumno,
    });

    return NextResponse.json({ id });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, data } = await req.json();
    await convex.mutation(api.functions.grade.updateGrade, { id, data });
    return NextResponse.json({ message: "Calificación actualizada" });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    await convex.mutation(api.functions.grade.deleteGrade, { id });
    return NextResponse.json({ message: "Calificación eliminada" });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}
