"use client";

import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditarMateria() {
    const params = useParams();
    const id = params.id as string;
    const materia = useQuery(api.functions.subject.getSubject, { identificador: id });
    const updateSubject = useMutation(api.functions.subject.updateSubject);
    const router = useRouter();

    const [formState, setFormState] = useState({
        identificador: "",
        materia: "",
    });

    useEffect(() => {
        if (materia) {
            setFormState({
                identificador: materia.identificador,
                materia: materia.materia,
            });
        }
    }, [materia]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await updateSubject({
            id: materia!._id,
            identificador: formState.identificador,
            materia: formState.materia,
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
                    <label htmlFor="identificador" className="text-sm font-medium text-gray-100">
                        Identificador
                    </label>
                    <input
                        type="text"
                        value={formState.identificador}
                        onChange={e => setFormState({ ...formState, identificador: e.target.value })}
                        name="identificador"
                        id="identificador"
                        className="mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 bg-gray-700"
                        required
                    />
                </div>
                <div className={"flex flex-col mt-1"}>
                    <label htmlFor="materia" className="text-sm font-medium text-gray-100">
                        Materia
                    </label>
                    <input
                        type="text"
                        value={formState.materia}
                        onChange={e => setFormState({ ...formState, materia: e.target.value })}
                        name="materia"
                        id="materia"
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