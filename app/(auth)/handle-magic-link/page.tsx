// app/(auth)/handle-magic-link/page.tsx
"use client";

import { useSignIn } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function HandleMagicLinkPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn } = useSignIn();
  const ticket = searchParams.get("__clerk_ticket");

  useEffect(() => {
    const handleMagicLink = async () => {
      if (!ticket || !signIn) return;

      try {
        const result = await signIn.create({
          strategy: "ticket",
          ticket,
        });

        if (result.status === "needs_new_password") {
          // Redirigir a página de cambio de contraseña
          router.push("/reset-password?from_magic_link=true");
        } else if (result.status === "complete") {
          // Redirigir al dashboard
          router.push("/");
        }
      } catch (error) {
        console.error("Error handling magic link:", error);
        router.push("/sign-in?error=invalid_link");
      }
    };

    handleMagicLink();
  }, [ticket, signIn, router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <span className="sr-only">Procesando enlace mágico...</span>
    </div>
  );
}