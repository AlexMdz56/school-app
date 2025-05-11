import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";

import React from 'react'

export default function TablaMaterias() {
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
    );
}

