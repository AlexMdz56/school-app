"use client";

import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import React from "react";

interface Classroom {
    numero: number;
    edificio: string;
    planta: string;
}

export default function NuevoSalon() {
    const saveClassroom = useMutation(api.functions.classroom.saveClassroom);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data: Classroom = {
            numero: Number(formData.get('numero')),
            edificio: formData.get('edificio') as string,
            planta: formData.get('planta') as string,
        }

        await saveClassroom(data);
        router.back();
    }

    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center px-4">
            <div className="w-full max-w-md mx-auto p-4 overflow-y-auto h-full md:h-auto flex flex-col">
                <h2 className="text-xl font-semibold text-center">Nuevo Salón</h2>
            </div>
            <form
                className="w-full max-w-md mx-auto p-4 overflow-y-auto h-full md:h-auto flex flex-col space-y-4"
                onSubmit={handleSubmit}
            >
                <div className={"flex flex-col mt-1"}>
                    <label htmlFor="numero" className="text-sm font-medium text-gray-100">
                        Número
                    </label>
                    <input
                        type="number"
                        min="1"
                        name="numero"
                        id="numero"
                        className="mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 bg-gray-700"
                        required
                    />
                </div>
                <div className={"flex flex-col mt-1"}>
                    <label htmlFor="edificio" className="text-sm font-medium text-gray-100">
                        Edificio
                    </label>
                    <input
                        type="text"
                        name="edificio"
                        id="edificio"
                        className="mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 bg-gray-700"
                        required
                    />
                </div>
                <div className={"flex flex-col mt-1"}>
                    <label htmlFor="planta" className="text-sm font-medium text-gray-100">
                        Planta
                    </label>
                    <input
                        type="text"
                        name="planta"
                        id="planta"
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
    );
}