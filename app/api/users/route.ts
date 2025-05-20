"use server";

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

export async function PATCH(request: Request) {
  try {
    const { id, clerkUserId, nombre, correo, rol } = await request.json();

    // Validaciones básicas
    if (!clerkUserId || !correo) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // 1. Obtener usuario actual
    const currentUser = await clerk.users.getUser(clerkUserId);
    const currentPrimaryEmail = currentUser.emailAddresses.find(
      e => e.id === currentUser.primaryEmailAddressId
    );

    // 2. Solo actualizar correo si es diferente
    if (currentPrimaryEmail?.emailAddress !== correo) {
      try {
        // Verificar si el correo ya está asignado a otro usuario
        const { data: existingUsers } = await clerk.users.getUserList({
          emailAddress: [correo],
        });

        if (
          existingUsers.length > 0 &&
          existingUsers[0].id !== clerkUserId
        ) {
          return NextResponse.json(
            { error: "Este correo ya está en uso por otro usuario" },
            { status: 409 }
          );
        }

        // 3. Crear nueva dirección de correo
        const newEmail = await clerk.emailAddresses.createEmailAddress({
          userId: clerkUserId,
          emailAddress: correo,
        });

        // 4. Marcar como verificada y primaria
        await clerk.emailAddresses.updateEmailAddress(newEmail.id, {
          verified: true,
          primary: true,
        });

        // 5. Establecer el nuevo email como primario en el usuario
        await clerk.users.updateUser(clerkUserId, {
          primaryEmailAddressID: newEmail.id,
        });

        // 6. Eliminar correo anterior si existe
        if (currentPrimaryEmail) {
          await clerk.emailAddresses.deleteEmailAddress(currentPrimaryEmail.id);
        }

      } catch (error: unknown) {
        console.error("Error detallado al actualizar el correo:", error);

        let errorDetails = "Error actualizando el correo";
        let clerkTraceId = "";

        if (typeof error === "object" && error !== null) {
          errorDetails = (error as { message?: string }).message || errorDetails;
          clerkTraceId = (error as { clerkTraceId?: string }).clerkTraceId || "";

          if ("errors" in error) {
            const clerkErrors = (error as { errors?: Array<{ message: string }> }).errors;
            if (clerkErrors && clerkErrors.length > 0) {
              errorDetails = clerkErrors.map(e => e.message).join(", ");
            }
          }
        }

        return NextResponse.json(
          {
            success: false,
            error: errorDetails,
            clerkTraceId,
          },
          { status: 422 }
        );
      }
    }

    // 3. Actualizar en Convex
    const convexResult = await fetchMutation(api.functions.user.updateUser, {
      id,
      nombre,
      correo,
      rol,
    });

    return NextResponse.json({
      success: true,
      message: "User updated successfully",
      convexResult
    });

  } catch (error: unknown) {
    console.error("Global update error:", error);

    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    const clerkTraceId = (error as { clerkTraceId?: string })?.clerkTraceId || "";

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        clerkTraceId
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email es requerido" }, { status: 400 });
  }

  try {
    // Buscar usuario por email
    const { data: users } = await clerk.users.getUserList({ emailAddress: [email] });

    if (!users.length) {
      return NextResponse.json({
        message: `No se encontró usuario con el correo ${email}`,
      }, { status: 404 });
    }

    const userId = users[0].id;

    // Eliminar usuario
    await clerk.users.deleteUser(userId);

    return NextResponse.json({
      message: `Usuario ${email} eliminado con éxito.`,
    });
  } catch (error) {
    console.error("Error eliminando usuario:", error);
    return NextResponse.json({
      error: "Error al eliminar usuario",
    }, { status: 500 });
  }
}