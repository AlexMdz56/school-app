export default async function Home() {
  const sections = [
    { name: "Alumnos", href: "/alumnos" },
    { name: "Maestros", href: "/maestros" },
    { name: "Materias", href: "/materias" },
    { name: "Salones", href: "/salones" },
    { name: "Horarios", href: "/horarios" },
    { name: "Calificaciones", href: "/calificaciones" },
    { name: "Usuarios", href: "/users" },
  ];

  return (
    <main className="min-h-screen flex items-center justify-center transition-opacity">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-4xl font-bold mb-8 transition-opacity">Bienvenido al Sistema Escolar</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sections.map((section) => (
            <a
              key={section.name}
              href={section.href}
              className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow hover:shadow-md transition border text-lg font-semibold text-gray-800 dark:text-gray-100"
            >
              {section.name}
            </a>

          ))}
        </div>
      </div>
    </main>
  );
}
