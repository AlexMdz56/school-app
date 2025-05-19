'use client';

import { Suspense } from 'react';
import { useSignIn } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

function MagicLinkHandlerContent() {
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
          router.push("/reset-password?from_magic_link=true&email=" + encodeURIComponent(result.identifier || ""));
        } else if (result.status === "complete") {
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
      <p>Procesando enlace mágico...</p>
    </div>
  );
}

export default function HandleMagicLinkPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-screen">
        <p>Cargando...</p>
      </div>
    }>
      <MagicLinkHandlerContent />
    </Suspense>
  );
}