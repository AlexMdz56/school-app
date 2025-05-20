"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Label } from "@radix-ui/react-label";
import { useQuery } from "convex/react";
import { ArrowLeft, Save } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function EditarUser() {
    const params = useParams();
    const id = params.id as string;
    const user = useQuery(api.functions.user.getUserByClerkId, { clerkUserId: id });
    const router = useRouter();

    const [result, setResult] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formState, setFormState] = useState({
        id: "",
        nombre: "",
        correo: "",
        rol: "",
    });

    const rol = [
        "admin",
        "user",
    ]

    useEffect(() => {
        if (user) {
            setFormState({
                id: user._id as Id<"users">,
                nombre: user.nombre,
                correo: user.correo,
                rol: user.rol,
            });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormState((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        if (!user) return;
        try {
            const response = await fetch(`/api/users`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: user._id,
                    clerkUserId: user.clerkUserId,
                    nombre: formState.nombre,
                    correo: formState.correo,
                    rol: formState.rol,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                const errorMessage = [
                    data.error,
                    data.suggestion,
                    `Trace ID: ${data.clerkTraceId || 'none'}`
                ].filter(Boolean).join('\n\n');

                throw new Error(errorMessage);
            }

            setResult("Usuario actualizado correctamente");
            setTimeout(() => {
                setResult(null);
                router.push(`/users/${id}`);
            }, 2000);
        } catch (error) {
            console.error("Update error:", error);

            if (error instanceof Error) {
                setResult(`Error: ${error.message}`);
            } else {
                setResult("Ocurrió un error desconocido al actualizar el usuario.");
            }
            setTimeout(() => setResult(null), 3000);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (user === undefined) {
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

    if (!user) {
        return (
            <div className="container mx-auto py-10">
                <div className="flex items-center gap-2 mb-6">
                    <Button variant="outline" size="icon" onClick={() => router.back()}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <h1 className="text-3xl font-bold">Usuario no encontrado</h1>
                </div>
                <p>No se pudo encontrar el usuario con el ID proporcionado.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-10">
            <div className="flex flex-col items-center gap-2 mb-6">
                <Button variant="outline" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <h1 className="text-3xl font-bold">Editar Usuario</h1>
            </div>

            <Card className="max-w-2xl mx-auto">
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle className="font-semibold text-center">Modificar información de {user.nombre}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="nombre">Nombre</Label>
                            <Input
                                id="nombre"
                                name="nombre"
                                value={formState.nombre}
                                onChange={handleChange}
                                placeholder="Ej: Alejandro Pérez"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="correo">Correo</Label>
                            <Input
                                id="correo"
                                type="email"
                                name="correo"
                                value={formState.correo}
                                onChange={handleChange}
                                placeholder="ejemplo@ejemplo.com"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="correo">Rol</Label>
                            <Select
                                onValueChange={(value) => handleSelectChange("rol", value)}
                                value={formState.rol}
                            >
                                <SelectTrigger id="rol">
                                    <SelectValue placeholder="Selecciona un Rol" />
                                </SelectTrigger>
                                <SelectContent>
                                    {rol.map((r) => (
                                        <SelectItem key={r} value={r}>
                                            {r}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
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
                        {result && (
                            <div className={`mt-2 text-center ${result.startsWith("Error") ? "text-red-500" : "text-green-600"}`}>
                                {result}
                            </div>
                        )}
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
