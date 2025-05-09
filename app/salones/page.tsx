"use client";

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";

export default function Salones() {
    const salones = useQuery(api.functions.classroom.getClassrooms);
    const router = useRouter();

    const handleClick = (id: string) => router.push(`/salones/${id}`);

    if (salones === undefined) {
        return (
            <div className="p-6 text-center">
                <h1 className="text-2xl font-bold mb-2">
                    Cargando salones...
                </h1>
            </div>);
    };

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center">
                <button onClick={() => router.push('/')} className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition m-10 p-10">
                    Regresar al inicio
                </button>
                <button onClick={() => router.push("/salones/nuevo-salon")} className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition m-10 p-10">
                    Nuevo Salón
                </button>
            </div>
            <Table>
                <TableCaption>Lista de Salones</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center" >Número</TableHead>
                        <TableHead className="text-center" >Edificio</TableHead>
                        <TableHead className="text-center" >Planta</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {salones?.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={3} className="text-center">
                                No hay salones asignados
                            </TableCell>
                        </TableRow>
                    ) : (
                        salones?.map(salon => (
                            <TableRow
                                key={salon._id}
                                onClick={() => handleClick(salon._id)}
                                className="cursor-pointer hover:bg-muted">
                                <TableCell>{salon.numero}</TableCell>
                                <TableCell>{salon.edificio}</TableCell>
                                <TableCell>{salon.planta}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}