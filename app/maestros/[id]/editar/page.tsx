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

export default function EditarMaestro() {
    const params = useParams();
    const id = params.id as string;
    const maestro = useQuery(api.functions.teacher.getTeacher, { numEmpleado: id });
    const updateTeacher = useMutation(api.functions.teacher.updateTeacher);
    const router = useRouter();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formState, setFormState] = useState({
        numEmpleado: "",
        nombre: "",
        correo: "",
    });

    useEffect(() => {
        if (maestro) {
            setFormState({
                numEmpleado: maestro.numEmpleado,
                nombre: maestro.nombre,
                correo: maestro.correo,
            })
        }
    }, [maestro]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!maestro) return;
        try {
            await updateTeacher({
                id: maestro._id,
                ...formState,
            });
            router.push(`/maestros/${id}`);
        } catch (error) {
            console.error("Error al actualizar maestro:", error);
        } finally {
            setIsSubmitting(false);
        }
    }

    if (maestro === undefined) {
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
    
        if (!maestro) {
            return (
                <div className="container mx-auto py-10">
                    <div className="flex items-center gap-2 mb-6">
                        <Button variant="outline" size="icon" onClick={() => router.back()}>
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <h1 className="text-3xl font-bold">Maestro no encontrado</h1>
                    </div>
                    <p>No se pudo encontrar el maestro con el ID proporcionado.</p>
                </div>
            );
        }

    return (
       <div className="container mx-auto py-10">
            <div className="flex flex-col items-center gap-2 mb-6">
                <Button variant="outline" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <h1 className="text-3xl font-bold">Editar maestro</h1>
            </div>

            <Card className="max-w-2xl mx-auto">
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle className="font-semibold text-center">Modificar información de {maestro.nombre}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="numEmpleado">Número de Empleado</Label>
                            <Input
                                id="numEmpleado"
                                name="numEmpleado"
                                value={formState.numEmpleado}
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
                                placeholder="Nombre del maestro"
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