"use client";

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useConvex } from "convex/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Grades {
    _id: Id<"grades">;
    materia: string;
    nota: number,
    alumno: Id<"students">;
}

export function TablaCalificaciones() {
    const [cali, setCalif] = useState<Grades[] | null>(null);
    const [studentMap, setStudentMap] = useState<Record<string, string>>({});
    const router = useRouter();
    const convex = useConvex();

    useEffect(() => {
        async function fetchDAta() {
            const res = await fetch('/api/calificaciones', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await res.json();
            setCalif(data);
        }
        fetchDAta();
    }, []);

    useEffect(() => {
        async function fetchStudents() {
            if (!cali) return;
            const map: Record<string, string> = {};

            for (const c of cali) {
                try {
                    const res = await convex.query(api.functions.student.getStudentById, { id: c.alumno });
                    if (res) {
                        map[c.alumno] = res.nombre;
                    }
                } catch (error) {
                    console.error("Error obteniendo estudiante:", error);
                }
            }

            setStudentMap(map);
        }

        fetchStudents();
    }, [cali, convex]);

    if (cali === undefined) {
        return <div>Cargando calificaciones...</div>;
    }

    return (
        <Table>
            <TableCaption>Lista de calificaciones registradas</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Materia</TableHead>
                    <TableHead>Alumno</TableHead>
                    <TableHead>Nota</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {cali?.length === 0 ? (
                    <TableRow>
                        <TableCell className="text-center">
                            No hay calificaciones registradas
                        </TableCell>
                    </TableRow>
                ) : (
                    cali?.map((cal) => (
                        <TableRow
                            key={cal._id}
                            className="cursor-pointer hover:bg-muted/50"
                            onClick={() => router.push(`/calificaciones/${cal._id}`)}
                        >
                            <TableCell>{cal.materia}</TableCell>
                            <TableCell>{studentMap[cal.alumno]}</TableCell>
                            <TableCell>{cal.nota}</TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    );
}