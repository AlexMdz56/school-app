"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

interface Students {
    id: Id<"students">;
    matricula: string;
    nombre: string;
    correo: string;
}

export default function NuevaCalificacion() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        materia: "",
        nota: "",
        alumno: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [students, setStudents] = useState<Students[]>([]);
    const convex = useConvex();

    useEffect(() => {
        async function fetchStudents() {
            try {
                const res = await convex.query(api.functions.student.getStudents, {});
                setStudents(res);
            } catch (error) {
                console.error("Error cargando estudiantes:", error);
            }
        }

        fetchStudents();
    }, [convex]);

    async function createGrade() {
        const response = await fetch('/api/calificaciones', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                materia: formData.materia,
                nota: Number(formData.nota),
                alumno: formData.alumno,
            })
        });

        if (!response.ok) {
            const err = await response.text();
            console.error("Server response:", err);
            throw new Error(`Error HTTP: ${response.status}`)
        }

        await response.json();
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            createGrade();
            router.back();
            setFormData({
                materia: "",
                nota: "",
                alumno: "",
            });
        } catch (error) {
            console.error("Error al crear calificación:", error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="container px-4 sm:px-6 lg:px-8 py-10 mx-auto">
            <div className="flex flex-col items-center sm:justify-between gap-4 mb-8">
                <div className="flex flex-col items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => router.back()}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <h1 className="text-2xl sm:text-3xl font-bold">
                        Crear Nuevo Estudiante
                    </h1>
                </div>
            </div>

            <Card className="w-full max-w-2xl mx-auto">
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle className="font-semibold text-center">Información del Estudiante</CardTitle>
                    </CardHeader>

                    <CardContent className="grid grid-cols-1 gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="materia">Materia</Label>
                            <Input
                                id="materia"
                                name="materia"
                                value={formData.materia}
                                onChange={handleChange}
                                placeholder="Ej: Biología"
                                required
                            />
                        </div>

                        <div className="grid gap-2">
                            <select
                                id="alumno"
                                name="alumno"
                                value={formData.alumno}
                                onChange={handleChange}
                                required
                                className="border rounded px-3 py-2"
                            >
                                <option value="">Selecciona un alumno</option>
                                {students.map((student) => (
                                    <option key={student.id} value={student.id} className="bg-black">
                                        {student.matricula} - {student.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="nota">Nota (0-10)</Label>
                            <Input
                                id="nota"
                                name="nota"
                                type="number"
                                min={0}
                                max={10}
                                value={formData.nota}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-col sm:flex-row justify-between gap-4 mt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.back()}
                            disabled={isSubmitting}
                            className="w-full sm:w-auto"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full sm:w-auto"
                        >
                            {isSubmitting ? "Creando..." : "Cargar Calificación"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}