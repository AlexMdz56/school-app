"use client";

import { useSignIn } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const { signIn, isLoaded } = useSignIn();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const email = searchParams.get("email");

  // Estado para controlar el flujo de reset
  const [resetFlowStarted, setResetFlowStarted] = useState(false);

  const resendVerificationCode = async () => {
    if (!email || !isLoaded) return;

    setIsResending(true);
    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email
      });
    } catch (err) {
      console.error("Error al reenviar código:", err);
      setError("Error al reenviar el código");
    } finally {
      setIsResending(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones
    if (!newPassword || !confirmPassword || !verificationCode) {
      setError("Todos los campos son requeridos");
      return;
    }
    if (newPassword.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    if (!isLoaded || !resetFlowStarted) {
      setError("El proceso no se ha iniciado correctamente");
      return;
    }

    setIsSubmitting(true);

    try {
      // Intentar cambiar la contraseña
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        password: newPassword,
        code: verificationCode
      });

      if (result.status === "complete") {
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
        setError("No se pudo completar el cambio de contraseña");
      }
    } catch (err: unknown) {
      console.error("Error:", err);

      if (
        typeof err === "object" &&
        err !== null &&
        "errors" in err &&
        Array.isArray((err as { errors?: unknown }).errors)
      ) {
        const maybeErrors = (err as { errors: unknown }).errors;

        if (
          Array.isArray(maybeErrors) &&
          typeof maybeErrors[0] === "object" &&
          maybeErrors[0] !== null &&
          "message" in maybeErrors[0]
        ) {
          const typedErr = maybeErrors as { message?: string; code?: string }[];

          if (typedErr[0].code === "form_code_incorrect") {
            setError("Código incorrecto. Por favor verifica el código recibido.");
          } else {
            setError(typedErr[0].message || "Error al cambiar la contraseña");
          }
        } else {
          setError("Ocurrió un error inesperado");
        }
      } else {
        setError("Ocurrió un error inesperado");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    // Iniciar flujo de reset al cargar
    const startResetFlow = async () => {
      if (!email || !isLoaded) return;

      try {
        await signIn.create({
          strategy: "reset_password_email_code",
          identifier: email
        });
        setResetFlowStarted(true);
      } catch (err) {
        console.error("Error al iniciar flujo de reset:", err);
        setError("Error al iniciar el proceso de cambio de contraseña");
      }
    };

    if (isLoaded && email && !resetFlowStarted) {
      startResetFlow();
    }
  }, [isLoaded, email, resetFlowStarted, signIn]);

  return (
    <div className="w-full min-h-screen flex justify-center items-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md mx-auto p-4 space-y-4"
      >
        <h2 className="text-xl font-semibold text-center">Cambiar Contraseña</h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div className="space-y-2">
          <Label>Código de Verificación</Label>
          <div className="flex gap-2">
            <Input
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="Código de 6 dígitos"
              required
            />
            <Button
              type="button"
              variant="outline"
              onClick={resendVerificationCode}
              disabled={isResending}
            >
              {isResending ? "Enviando..." : "Reenviar código"}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Se envió un código a: {email}
          </p>
        </div>

        <div className="space-y-2">
          <Label>Nueva Contraseña</Label>
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Mínimo 8 caracteres"
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Confirmar Contraseña</Label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Repite tu contraseña"
            required
          />
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Procesando..." : "Cambiar Contraseña"}
        </Button>
      </form>
    </div>
  );
}