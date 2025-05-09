/**
 * # app/page.tsx
 * * Página principal de la aplicación.
 *   Implementa un diseño centrado y responsive para el contenido inicial.
 */

export default function Home() {
  return (
    <main className="container mx-auto py-10">
      <h1 className="text-4xl font-bold text-center">
        Bienvenido a Mi Escuela
      </h1>
      <p className="mt-4 text-lg text-center">
        Esta es la página principal de tu aplicación.
      </p>
    </main>
  );
}