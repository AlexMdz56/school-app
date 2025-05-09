"use client";

import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import React from "react";

interface Teacher {
    numEmpleado: string;
    nombre: string;
    correo: string;
}

export default function NuevoMaestro() {
    const saveTeacher = useMutation(api.functions.teacher.saveTeacher);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data: Teacher = {
            numEmpleado: formData.get('numEmpleado') as string,
            nombre: formData.get('nombre') as string,
            correo: formData.get('correo') as string,
        }

        await saveTeacher(data);
        router.back();
    }

    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center px-4">
            <div className="w-full max-w-md mx-auto p-4 overflow-y-auto h-full md:h-auto flex flex-col">
                <h2 className="text-xl font-semibold text-center">Nuevo Maestro</h2>
            </div>
            <form
                className="w-full max-w-md mx-auto p-4 overflow-y-auto h-full md:h-auto flex flex-col space-y-4"
                onSubmit={handleSubmit}
            >
                <div className={"flex flex-col mt-1"}>
                    <label htmlFor="numEmpleado" className="text-sm font-medium text-gray-100">
                        Número de Empleado
                    </label>
                    <input
                        type="text"
                        name="numEmpleado"
                        id="numEmpleado"
                        className="mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 bg-gray-700"
                        required
                    />
                </div>
                <div className={"flex flex-col mt-1"}>
                    <label htmlFor="nombre" className="text-sm font-medium text-gray-100">
                        Nombre
                    </label>
                    <input
                        type="text"
                        name="nombre"
                        id="nombre"
                        className="mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 bg-gray-700"
                        required
                    />
                </div>
                <div className={"flex flex-col mt-1"}>
                    <label htmlFor="correo" className="text-sm font-medium text-gray-100">
                        Correo
                    </label>
                    <input
                        type="text"
                        name="correo"
                        id="correo"
                        className="mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 bg-gray-700"
                        required
                    />
                </div>
                <div className="mt-6 flex justify-end gap-4 md:gap-2 md:mt-3 ">
                    <button type="button" onClick={() => router.back()} className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition">
                        Regresar
                    </button>
                    <button type="submit" className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition">
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    )
}