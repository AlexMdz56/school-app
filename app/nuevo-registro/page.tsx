"use client";

import { useRouter } from 'next/navigation'
import React from 'react'

export default function NuevoRegistro() {
    const router = useRouter();
    return (
        <div className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center">
            <h1>Selecciona cual será el nuevo registro que anexarás</h1>
            <div className="flex flex-col ">
                <button onClick={() => router.push("/alumnos/nuevo-alumno")} className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition m-10 p-10">
                    Nuevo Alumno
                </button>
                <button onClick={() => router.push("/maestros/nuevo-maestro")} className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition m-10 p-10">
                    Nuevo Maestro
                </button>
                <button onClick={() => router.push("/materias/nueva-materia")} className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition m-10 p-10">
                    Nueva Materia
                </button>
                <button onClick={() => router.push("/horarios/nuevo-horario")} className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition m-10 p-10">
                    Nuevo Horario
                </button>
                <button onClick={() => router.push("/salones/nuevo-salon")} className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition m-10 p-10">
                    Nuevo Salón
                </button>
            </div>
        </div>
    )
}
