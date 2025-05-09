"use client";

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";

export default function Materias() {
    const materias = useQuery(api.functions.subject.getSubjects);
    const router = useRouter();

    const handleClick = (id: string) => router.push(`/materias/${id}`);

    if (materias === undefined) {
        return (
            <div className="p-6 text-center">
                <h1 className="text-2xl font-bold mb-2">
                    Cargando materias...
                </h1>
            </div>);
    };

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center">
                <button onClick={() => router.push('/')} className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition m-10 p-10">
                    Regresar al inicio
                </button>
                <button onClick={() => router.push("/materias/nueva-materia")} className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition m-10 p-10">
                    Nueva Materia
                </button>
            </div>
            <Table>
                <TableCaption>Lista de Estudiantes Registrados</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center" >Identificador</TableHead>
                        <TableHead className="text-center" >Materia</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {materias?.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={3} className="text-center">
                                No hay materias registradas
                            </TableCell>
                        </TableRow>
                    ) : (
                        materias?.map(materia => (
                            <TableRow
                                key={materia._id}
                                onClick={() => handleClick(materia.identificador)}
                                className="cursor-pointer hover:bg-muted">
                                <TableCell>{materia.identificador}</TableCell>
                                <TableCell>{materia.materia}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}