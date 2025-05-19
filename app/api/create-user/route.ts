import { NextResponse } from "next/server";
import { createClerkClient } from "@clerk/backend";
import { Resend } from "resend";
import { generateSecurePassword } from "@/utils/functions";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY! });
const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: Request) {
  try {
    const { nombre, correo, rol } = await request.json();

    // 1. Crear usuario en Clerk
    const password = generateSecurePassword();
    const clerkUser = await clerk.users.createUser({
      emailAddress: [correo],
      password,
      skipPasswordRequirement: false,
      skipPasswordChecks: false,
    });

    // const userExists = await clerk.users.getUserList({ emailAddress: [correo] });
    // if (userExists.length > 0) {
    //   clerkUser = userExists[0];
    // } else {
    //   throw error; // Relanzar el error si realmente falló
    // }

    // 2. Almacenar en Convex
    const convexResult = await fetchMutation(api.functions.user.saveUser, {
      clerkUserId: clerkUser.id,
      nombre,
      correo,
      rol,
    });

    // 3. Enviar correo con Resend
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const resetUrl = `${baseUrl}/reset-password?email=${encodeURIComponent(correo)}`;
    // const resetUrl = `${baseUrl}/reset-password?token=${encodeURIComponent(token)}`;

    const { data: emailResult } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: correo,
      subject: "Configura tu contraseña",
      html: `
        <h1>Bienvenido a nuestra plataforma</h1>
        <p>Haz clic en el siguiente enlace para configurar tu contraseña:</p>
        <a href="${resetUrl}">Configurar contraseña</a>
        <p>Este enlace expirará en 24 horas.</p>
      `,
    });

    return NextResponse.json({
      success: true,
      clerkUserId: clerkUser.id,
      convexUserId: convexResult.userId,
      emailId: emailResult?.id,
    });
  } catch (error: unknown) {
    console.error("Full error creating user:", error);

    let message = "Error desconocido";
    let status = 500;

    if (
      typeof error === "object" &&
      error !== null &&
      "message" in error &&
      typeof (error as { message?: unknown }).message === "string"
    ) {
      message = (error as { message: string }).message;
    }

    if (
      typeof error === "object" &&
      error !== null &&
      "status" in error &&
      typeof (error as { status?: unknown }).status === "number"
    ) {
      status = (error as { status: number }).status;
    }

    return NextResponse.json({ success: false, error: message }, { status });
  }
}
