"use client";

import { useSignIn } from "@clerk/nextjs";
import { useState } from "react";


export default function SignInPage() {
  const { signIn, isLoaded } = useSignIn()
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        window.location.href = "/";
      } else {
        console.log(result);
      }
    } catch (error: unknown) {
      console.error(error);
      if (
        typeof error === "object" &&
        error !== null &&
        "errors" in error &&
        Array.isArray((error as { errors: { message: string }[] }).errors)
      ) {
        const typedError = error as { errors: { message: string }[] };
        setErrorMsg(typedError.errors[0].message);
      } else {
        setErrorMsg("Error desconocido");
      }
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md mx-auto p-4 overflow-y-auto h-full md:h-auto flex flex-col space-y-4 border rounded-xl shadow-md"
      >
        <h2 className="text-xl font-semibold text-center">Iniciar sesión</h2>

        {errorMsg && (
          <p className="text-red-500 text-sm">{errorMsg}</p>
        )}

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-primary text-black py-2 rounded hover:bg-primary/90"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  )
}
