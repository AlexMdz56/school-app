"use client";

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";

export default function Maestros() {
    const maestros = useQuery(api.functions.teacher.getTeachers);
    const router = useRouter();

    const handleClick = (id: string) => router.push(`/maestros/${id}`);

    if (maestros === undefined) {
        return (
            <div className="p-6 text-center">
                <h1 className="text-2xl font-bold mb-2">
                    Cargando maestros...
                </h1>
            </div>);
    };

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center">
                <button onClick={() => router.push('/')} className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition m-10 p-10">
                    Regresar al inicio
                </button>
                <button onClick={() => router.push("/maestros/nuevo-maestro")} className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition m-10 p-10">
                    Nuevo Maestro
                </button>
            </div>
            <Table>
                <TableCaption>Lista de Maestros</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center">Número de Empleado</TableHead>
                        <TableHead className="text-center">Nombre</TableHead>
                        <TableHead className="text-center">Correo</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {maestros?.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={3} className="text-center">
                                No hay maestros registrados
                            </TableCell>
                        </TableRow>
                    ) : (
                        maestros?.map(maestro => (
                            <TableRow
                                key={maestro._id}
                                onClick={() => handleClick(maestro.numEmpleado)}
                                className="cursor-pointer hover:bg-muted">
                                <TableCell>{maestro.numEmpleado}</TableCell>
                                <TableCell>{maestro.nombre}</TableCell>
                                <TableCell>{maestro.correo}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}