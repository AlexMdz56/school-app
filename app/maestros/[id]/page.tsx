"use client";

import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Maestro() {
    const params = useParams();
    const id = params.id as string;
    const router = useRouter();

    const maestro = useQuery(api.functions.teacher.getTeacher, { numEmpleado: id });
    const deleteTeacher = useMutation(api.functions.teacher.deleteTeacher);

    const [showModal, setShowModal] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    const handleDelete = async () => {
        if (!maestro?._id) return;
        await deleteTeacher({ id: maestro._id });
        setShowModal(false);
        router.back();
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) setShowModal(false);
        }

        if (showModal) document.addEventListener("mousedown", handleClickOutside);

        return () => document.addEventListener("mousedown", handleClickOutside);
    }, [showModal]);

    if (maestro === undefined) {
        return (
            <div className="p-6 text-center">
                <h1 className="text-2xl font-bold mb-2">
                    Cargando estudiante...
                </h1>
            </div>);
    };

    if (maestro === null) {
        return (
            <div className="p-6 text-center">
                <h1 className="text-2xl font-bold mb-2">Estudiante no encontrado</h1>
                <p>No se encontró ningún estudiante con la matrícula proporcionada.</p>
            </div>);
    };

    return (
        <div className="flex flex-1 min-h-[calc(100vh-5rem)] flex-col items-center justify-center">
            <div className="p-10 m-10">
                <h1 className="text-5xl font-bold mb-4">
                    Detalles del Estudiante {maestro.nombre}
                </h1>
                <ul className="space-y-2">
                    <li>
                        <strong>Matrícula:</strong> {maestro.numEmpleado}
                    </li>
                    <li>
                        <strong>Correo:</strong> {maestro.correo}
                    </li>
                </ul>
            </div>
            <div className="flex justify-between ">
                <button onClick={() => router.back()} className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition m-10 p-10" >
                    Volver a la lista
                </button>
                <button onClick={() => router.push(`${maestro.numEmpleado}/editar`)} className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition m-10 p-10">
                    Editar
                </button>
                <button onClick={() => setShowModal(true)} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-900 transition m-10 p-10">
                    Eliminar
                </button>
            </div>
            {showModal && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur flex items-center justify-center z-50">
                    <div ref={modalRef} className="bg-white rounded-xl p-6 max-w-sm w-full shadow-lg text-center">
                        <h2 className="text-lg font-semibold mb-4 text-black">
                            ¿Estás seguro de que deseas eliminar al maestro?
                        </h2>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition"
                            >
                                Cerrar
                            </button>
                            <button
                                onClick={handleDelete}
                                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-900 transition"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}