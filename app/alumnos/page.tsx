"use client";

import { useRouter } from "next/navigation";
import TablaAlumnos from "./tabla-alumnos";

export default function Alumnos() {
    const router = useRouter();


    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6">Sistema de Estudiantes</h1>
            <p className="text-muted-foreground mb-6">
                Haz clic en cualquier estudiante para ver sus detalles completos,
                editarlo o eliminarlo. Para crear un nuevo estudiante, usa el botón
                Nuevo Alumno.
            </p>
            <div className="flex justify-between items-center">
                <button onClick={() => router.push('/')} className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition m-10 p-10">
                    Regresar al inicio
                </button>
                <button onClick={() => router.push("/alumnos/nuevo-alumno")} className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition m-10 p-10">
                    Nuevo Alumno
                </button>
            </div>
            <TablaAlumnos />
        </div>
    );
}