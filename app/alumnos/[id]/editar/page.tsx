"use client";

import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui//button";
import { Input } from "@/components/ui//input";
import { Label } from "@/components/ui//label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui//card";
import { ArrowLeft, Save } from "lucide-react";
import { Skeleton } from "@/components/ui//skeleton";


export default function EditarAlumno() {
    const params = useParams();
    const id = params.id as string;
    const alumno = useQuery(api.functions.student.getStudent, { matricula: id });
    const updateStudent = useMutation(api.functions.student.updateStudent);
    const router = useRouter();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formState, setFormState] = useState({
        matricula: "",
        nombre: "",
        correo: "",
    });

    useEffect(() => {
        if (alumno) {
            setFormState({
                matricula: alumno.matricula,
                nombre: alumno.nombre,
                correo: alumno.correo,
            });
        }
    }, [alumno]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        if (!alumno) return;
        try {
            await updateStudent({
                id: alumno._id,
                ...formState,
            });
            router.push(`/alumnos/${id}`);
        } catch (error) {
            console.error("Error al actualizar alumno:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (alumno === undefined) {
        return (
            <div className="container mx-auto py-10">
                <div className="flex items-center gap-2 mb-6">
                    <Button variant="outline" size="icon" onClick={() => router.back()}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <Skeleton className="h-8 w-64" />
                </div>
                <Card className="max-w-2xl mx-auto">
                    <CardHeader>
                        <Skeleton className="h-8 w-full mb-2" />
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </CardContent>
                    <CardFooter>
                        <Skeleton className="h-10 w-24 mr-2" />
                        <Skeleton className="h-10 w-24" />
                    </CardFooter>
                </Card>
            </div>
        );
    }

    if (!alumno) {
        return (
            <div className="container mx-auto py-10">
                <div className="flex items-center gap-2 mb-6">
                    <Button variant="outline" size="icon" onClick={() => router.back()}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <h1 className="text-3xl font-bold">Alumno no encontrado</h1>
                </div>
                <p>No se pudo encontrar el alumno con el ID proporcionado.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-10">
            <div className="flex flex-col items-center gap-2 mb-6">
                <Button variant="outline" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <h1 className="text-3xl font-bold">Editar Alumno</h1>
            </div>

            <Card className="max-w-2xl mx-auto">
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle className="font-semibold text-center">Modificar información de {alumno.nombre}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="matricula">Matrícula</Label>
                            <Input
                                id="matricula"
                                name="matricula"
                                value={formState.matricula}
                                onChange={handleChange}
                                placeholder="Ej: A12345"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="nombre">Nombre Completo</Label>
                            <Input
                                id="nombre"
                                name="nombre"
                                value={formState.nombre}
                                onChange={handleChange}
                                placeholder="Nombre del estudiante"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="correo">Correo Electrónico</Label>
                            <Input
                                id="correo"
                                name="correo"
                                type="email"
                                value={formState.correo}
                                onChange={handleChange}
                                placeholder="correo@ejemplo.com"
                                required
                            />
                        </div>
                    </CardContent>

                    <CardFooter className="flex justify-between">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.back()}
                            disabled={isSubmitting}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex items-center gap-2 mt-8"
                        >
                            <Save className="h-4 w-4" />
                            {isSubmitting ? "Guardando..." : "Guardar Cambios"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}