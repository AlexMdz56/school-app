"use client";

import { useRouter } from 'next/navigation'
import React from 'react'

export default function Admin() {
    const router = useRouter();
    return (
        <div className="flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center">
            <h1>Administrador Escolar</h1>
            <div className="flex flex-col ">
                <button onClick={() => router.push("/alumnos")} className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition m-10 p-10">
                    Alumnos
                </button>
                <button onClick={() => router.push("/maestros")} className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition m-10 p-10">
                    Maestros
                </button>
                <button onClick={() => router.push("/materias")} className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition m-10 p-10">
                    Materias
                </button>
                <button onClick={() => router.push("/horarios")} className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition m-10 p-10">
                    Horarios
                </button>
                <button onClick={() => router.push("/salones")} className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition m-10 p-10">
                    Salones
                </button>
            </div>
        </div>
    )
}
