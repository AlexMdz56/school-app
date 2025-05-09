"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditarMateria() {
    const params = useParams();
    const id = params.id as Id<"classrooms">;
    const salon = useQuery(api.functions.classroom.getClassroom, { id });
    const updateClassroom = useMutation(api.functions.classroom.updateClassroom);
    const router = useRouter();

    const [formState, setFormState] = useState({
        numero: 0,
        edificio: "",
        planta: "",
    });

    useEffect(() => {
        if (salon) {
            setFormState({
                numero: salon.numero,
                edificio: salon.edificio,
                planta: salon.planta,
            });
        }
    }, [salon]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await updateClassroom({
            id: salon!._id,
            numero: formState.numero,
            edificio: formState.edificio,
            planta: formState.planta,
        });

        router.back();
    }

    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center px-4">
            <div className="w-full max-w-md mx-auto p-4 overflow-y-auto h-full md:h-auto flex flex-col">
                <h2 className="text-xl font-semibold text-center">Nueva Materia</h2>
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
                        value={formState.numero}
                        onChange={e => setFormState({ ...formState, numero: Number(e.target.value) })}
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
                        value={formState.edificio}
                        onChange={e => setFormState({ ...formState, edificio: e.target.value })}
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
                        value={formState.planta}
                        onChange={e => setFormState({ ...formState, planta: e.target.value })}
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